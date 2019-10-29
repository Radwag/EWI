## OPIS EWI

Aplikacja oparta na REACT oraz nodejs.<br/>
</br>

### App.js

Główny plik aplikacji: </br>

Funkcja closeWindow() - służy do zamknięcia aplikacji (zamyka przeglądarkę)

### ProgresBar.js

Funkcja runSocket() - uruchamia websocket na localhost na porcie 4101

Co 250 milisekund zostaje wysłane po websokecie zapytanie o masę

```{ COMMAND: 'GET_MASS' }```

i zostają zaktualizowane następujące zmienne:

``` 
Max - waga maksymalna
NetAct.Value - wartość aktualna
NetAct.Unit - jednostka aktualna
NetCal.Value - wartość kalibracyjna
isStab - czy stabilny
isTare - czy wytarowany
isZero - czy zero
NetAct.Precision - aktualna precyzja
```

Funkcja tare() - wysyła po websokecie komendę do tarowania wagi

```{ COMMAND: 'TARE' }```

Funkcja zero() - wysyła po websokecie komendę do zerowania wagi

```{ COMMAND: 'ZERO' }```


## Wersja produkcyjna

Aby przygotować wersję produkcyjną uruchamiamy komendę

```npm run build```

### start.js

Plik uruchmiający aplikację w trybie produkcyjnym

```node start.js```

