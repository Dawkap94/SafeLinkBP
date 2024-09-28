import re

from flask import Flask, request
import whois
import socket
import requests
from flask_cors import CORS
import ipaddress

app = Flask(__name__)
CORS(app)


def get_domain_info(domain):
    try:
        domain_info = whois.whois(domain)
        domain_output = {
            'registered_on': domain_info.creation_date,
            'expiration_date': domain_info.expiration_date,
            'registrar': domain_info.registrar,
            'name_server': domain_info.name_servers,
            'registrant_country': domain_info.country
        }
        return domain_output
    except Exception as e:
        return {'error': f'Error getting WHOIS information: {e}'}


def get_ip_address(domain):
    try:
        ip_address = socket.gethostbyname(domain)
        return {'ip_address': ip_address}
    except socket.gaierror:
        return {'ip_address': 'Unable to get IP address'}


def check_cert_base(domain: str) -> bool:
    with open('utils/cert_domains.txt', 'r') as file:
        for line in file:
            domain.replace('https://', '').replace('http://', '')
            if domain == line.strip():
                return True

        return False

def check_adguard_base(domain: str) -> bool:
    with open('utils/adguard_domains.txt', 'r') as file:
        cleaned_domain = re.sub(r'(https://www.|http://www.|http://|https://|www.)', '', domain)
        print(cleaned_domain)
        for line in file:
            if cleaned_domain == line.strip():
                return True

        return False


def is_ip_in_subnet(ip: str, subnet: str) -> bool:
    network = ipaddress.ip_network(subnet)
    ip_to_check = ipaddress.ip_address(ip)
    return ip_to_check in network


def check_spamip_list(ip):
    with open('utils/spamip.txt', 'r') as file:
        if not ip:
            return None

        for line in file:
            if is_ip_in_subnet(ip.get('ip_address'), line.strip().split(' ; ')[0]):
                return True
        return False


def get_geolocation(ip_address):
    try:
        ip = ip_address.get('ip_address')
        response = requests.get(f"https://ipinfo.io/{ip}/json")
        data = response.json()
        return {
            'geoinfo':
                {
                    'ip': data.get('ip'),
                    'city': data.get('city'),
                    'region': data.get('region'),
                    'country': data.get('country'),
                    'localization': data.get('loc'),
                    'organization': data.get('org')
                },
        }
    except Exception as e:
        return {'geoinfo': f'Error getting geolocation: {e}'}


@app.route('/check_safety', methods=['GET'])
def check_safety():
    domain_is_safe = False
    url = request.args.get('url')

    raw_url = url[1:]
    is_domain_in_adguard_base = check_adguard_base(raw_url)
    domain = re.sub(r'^(https://|http://|www\.)', '', url)
    cert_blacklisted = check_cert_base(domain)

    response = re.search(r'(http|https)://\w+\.\w+', raw_url)

    domain_is_valid = True if response else False

    if not domain_is_valid:
        return {
            'error': 'Domain is not in requested format. https://www.example.com'
        }

    try:
        ip_address = get_ip_address(domain)
        headers_dict = dict(requests.get(raw_url).headers)
        ip_address = get_ip_address(domain)
        ip_in_spamlist = check_spamip_list(ip_address)
    except Exception:
        headers_dict = {'error': None}
        ip_in_spamlist = None
        ip_address = None
    domain = re.sub(r'^(https://|http://|www\.)', '', raw_url)
    domain_info = get_domain_info(domain)


    ip_in_spamlist = check_spamip_list(ip_address)

    geo_localization = get_geolocation(ip_address) if ip_address else None
    if (
            not cert_blacklisted
            and not ip_in_spamlist
            and raw_url.startswith('https')
            and not is_domain_in_adguard_base
    ):
        domain_is_safe = True

    response_json = {
        'url': raw_url,
        'ip_address': ip_address,
        'safe': domain_is_safe,
        'cert_blacklisted': cert_blacklisted,
        'headers': headers_dict,
        'geo_localization': geo_localization,
        'domain_info': domain_info,
        'in_spamlist': ip_in_spamlist,
        'in_adguard_base': is_domain_in_adguard_base
    }

    return response_json


if __name__ == '__main__':
    app.run(debug=True)
