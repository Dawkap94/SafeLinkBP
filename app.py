import re

from flask import Flask, request
import whois
import socket
import requests
from flask_cors import CORS

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
        return {f'Error getting WHOIS information: {e}'}


def get_ip_address(domain):
    try:
        ip_address = socket.gethostbyname(domain)
        return {'ip_address': ip_address}
    except socket.gaierror:
        return {'ip_address': 'Unable to get IP address'}


def check_cert_base(domain: str) -> bool:
    with open('cert_domains.txt', 'r') as file:
        for line in file:
            domain.replace('https://', '').replace('http://', '')
            if domain == line.strip():
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
    domain = re.sub(r'(https|http)://', '', raw_url)
    cert_blacklisted = check_cert_base(domain)

    response = re.search(r'(http|https)://\w+\.\w+', raw_url)

    domain_is_valid = True if response else False

    if not domain_is_valid:
        return {
            'error': 'Domain is not in requested format. https://www.example.com'
        }

    try:
        headers_dict = dict(requests.get(raw_url).headers)
    except Exception as e:
        headers_dict = {'error': None}

    domain = re.sub('(https://|http://|wwww.|https://www.|http://www.)', '', raw_url)
    domain_info = get_domain_info(domain)

    ip_address = get_ip_address(domain)

    geo_localization = get_geolocation(ip_address) if ip_address else None
    if not cert_blacklisted:
        domain_is_safe = True

    response_json = {
        'url': raw_url,
        'ip_address': ip_address,
        'safe': domain_is_safe,
        'cert_blacklisted': cert_blacklisted ,
        'headers': headers_dict,
        'geo_localization': geo_localization,
        'domain_info': domain_info
    }

    return response_json


if __name__ == '__main__':
    app.run(debug=True)

# http://127.0.0.1:5000/check_safety?url=$https://n28.pl