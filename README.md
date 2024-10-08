# SafeLinkBP

### Opis

Nasza wtyczka do przeglądarek internetowych to nowoczesne narzędzie do monitorowania i oceny bezpieczeństwa odwiedzanych stron internetowych. Wtyczka analizuje wiele aspektów strony, aby zapewnić spokój ducha podczas przeglądania internetu.

### Funkcjonalności

Wtyczka sprawdza następujące informacje dla każdej odwiedzanej strony:

#### URL (raw_url): Pełny adres URL strony.

#### Adres IP (ip_address): Adres IP, na którym hostowana jest strona.

#### Bezpieczeństwo domeny (safe): Czy domena jest uznana za bezpieczną.

#### Nagłówki HTTP (headers): Informacje przesłane w nagłówkach HTTP.

#### Geolokalizacja (geo_localization): Lokalizacja geograficzna serwera.

#### Informacje o domenie (domain_info): Szczegółowe dane o domenie.

#### Czarna lista certyfikatów (in_cert_blacklist): Czy certyfikat strony znajduje się na czarnej liście.

#### Spamhaus Spamlist (in_spamhaus_spamlist): Czy IP strony znajduje się na liście spamowej Spamhaus.

#### RBL List (in_rbllist): Czy domena jest na liście RBL.

### Instalacja

Pobierz repozytorium git.
Otwórz przeglądarkę i przejdź do sekcji zarządzania wtyczkami/extensions. Na przykład chrome://extensions
Wybierz opcję „Załaduj rozszerzenie niezapakowane” i wskaż folder, w którym znajduje się pobrana wtyczka.
Aktywuj wtyczkę.
Użycie
Po zainstalowaniu wtyczki każda odwiedzana strona internetowa będzie automatycznie skanowana. Wyniki skanowania pojawią się w specjalnym panelu interfejsu użytkownika wtyczki.

Zrzuty ekranu

1. Wyłapany SCAM
2. ![fake_store](images/fake_store.jpg)

2. Interfejs wtyczki
   ![screenshot1](images/screenshot1.jpg)

3. Przykładowy request - część 1
   ![screenshot2](images/screenshot2.jpg)

4. Przykładowy request - część 2
   ![screenshot3](images/screenshot3.jpg)
