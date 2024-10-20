# SafeLinkBP

## 1. Opis

SafeLinkBP to wtyczka do przeglądarki, która pozwala użytkownikom na sprawdzenie na podstawie dostępnych danych, czy dana witryna internetowa jest bezpieczna przed wejściem na nią. Narzędzie chroni klientów zabezpieczając przed integracją z fałszywymi witrynami, które mogą stanowić realne zagrożenie. Usługa umożliwia użytkownikom wklejenie adresu URL w celu weryfikacji danych witryny w czasie rzeczywistym i zapobiegania potencjalnym oszustwom.

## 2. Funkcjonalności

*Wtyczka sprawdza następujące informacje dla każdej odwiedzanej strony:*
### URL (raw_url): Pełny adres URL strony
### Adres IP (ip_address): Adres IP, na którym hostowana jest strona.
### Bezpieczeństwo domeny (safe): Czy domena jest uznana za bezpieczną.
### Nagłówki HTTP (headers): Informacje przesłane w nagłówkach HTTP.
### Geolokalizacja (geo_localization): Lokalizacja geograficzna serwera.
### Informacje o domenie (domain_info): Szczegółowe dane o domenie.
### Czarna lista certyfikatów (in_cert_blacklist): Czy certyfikat strony znajduje się na czarnej liście.
### Spamhaus Spamlist (in_spamhaus_spamlist): Czy IP strony znajduje się na liście spamowej Spamhaus.
### RBL List (in_rbllist): Czy domena jest na liście RBL.

## 3. Instalacja

1. Pobierz repozytorium git.

2. Otwórz przeglądarkę i przejdź do sekcji zarządzania wtyczkami/extensions. Na przykład chrome://extensions

3. Wybierz opcję „Załaduj rozszerzenie niezapakowane” i wskaż folder, w którym znajduje się pobrana wtyczka.

4. Aktywuj wtyczkę.

## 4. Użycie
Po zainstalowaniu wtyczki każda odwiedzana strona internetowa będzie automatycznie skanowana. Wyniki skanowania pojawią się w specjalnym panelu interfejsu użytkownika wtyczki.

## 5. Unikalność 
Wtyczka sprawdza następujące informacje dla każdej odwiedzanej strony:
Nagłówki, Dane hostingu,  Dane domeny, Spam List, DNS BlackList, IP BlackList,
CERT Polska URL BlackList, Protokół, Certyfikat, Engine, Geolokalizacja. 

## 6. TODO
1. Stworzenie bazy danych w Redis i aktualizowanie jej raz dziennie;
2. Rozszerzenie narzędzia o inne przeglądarki;
3. Automatyczne sprawdzanie adresu URL;
4. Powiększenie bazy danych - obecnie CERT, SPAMHAUS, RBL LIST;
5. Możliwość korzystania z metod probabilistycznych weryfikujących reputację strony;
6. Możliwość implementacji AI do weryfikacji bezpieczeństwa.


## 7. Zrzuty ekranu

### 1. Wyłapany SCAM
  ![fake_store](images/fake_store.jpg)

### 2. Interfejs wtyczki
   ![screenshot1](images/screenshot1.jpg)

### 3. Przykładowy request - część 1
   ![screenshot2](images/screenshot2.jpg)

### 4. Przykładowy request - część 2
   ![screenshot3](images/screenshot3.jpg)
