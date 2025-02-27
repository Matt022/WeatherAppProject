# LibraryWebAPI documentation

Táto REST API aplikácia je použitá pre potreby predmetov ATP a FED1 v organizácii Metis Academy. Celkový solution obsahuje dva projekty.
1. LibraryAppWebAPI - obsahuje samotný projekt
2. LibraryAppWebAPITests - obsahuje xUnit testy na controllery a services

Databáza k tejto aplikácii obsahuje **6 hlavných tabuliek**:

* Title (Book a DVD)
* Members
* QueueItems
* RentalEntries
* Messages
* RequestLogs

V databáze sa nachádzajú aj Hangfire tabuľky, ktoré slúžia pre potreby background jobu.

## Background Job
V aplikácii v priečinku **BackgroundJobs** sa nachádza súbor **DataCleanupAndBackupJob.cs**. Tento job sa skladá z dvoch častí alebo teda krokov a to: 
- Zálohovanie databázy (záloha sa ukladá v Linux fileroote **/var/opt/mssql/backup**)
- Premazanie databázy a nahodenie defaultných dát.

Job sa spúšťa o 1 hodine ráno, takže raz za deň. Posunieme sa do priečinku **Controllers**, kde sa nachádzajú, už ako z názvu vyplýva, kontroléry

------------------------------------------------------------------------------------------
## Controllers

V priečinku Controllers sa nachádza 6 kontrolérov a to:
-   **BooksController.cs**
-   **DvdsController.cs**
-   **MembersController.cs**
-   **MessagesController.cs**
-   **QueueItemsController.cs**
-   **RentalEntriesController.cs**

### BooksController.cs
**Repository/BookRepository.cs**
**api/Books**
Obsahuje 5 endpointov na klasické CRUD operácie ako je GetBooks(), GetBook(), CreateBook(), UpdateBook(), DeleteBook(). K tomuto kontroléru patria 3 dátové modely a to:
- Book - tabuľka
- BookDto - dátový model pre vytváranie a úpravu knihy, POST a PUT (bez ID, ktoré vkladá databáza)
- BookRequestModel 
    - dátový model na GET requesty, z toho dôvodu, že v Book sa nachádza boolean vlastnosť "CanManipulate", ktorá indikuje to, či s danou knihou môžu z FE manipulovať (úprava, mazanie).

### DvdsController.cs
**Repository/DvdRepository.cs**
**api/Dvds**
Obsahuje 5 endpointov na klasické CRUD operácie ako je GetDvds(), GetDvd(), CreateDvd(), UpdateDvd(), DeleteDvd(). K tomuto kontroléru patria 3 dátové modely a to:
- Dvd - tabuľka
- DvdDto - dátový model pre vytváranie a úpravu DVD, POST a PUT (bez ID, ktoré vkladá databáza)
- DvdRequestModel 
    - dátový model na GET requesty, z toho dôvodu, že v Dvd sa nachádza boolean vlastnosť "CanManipulate", ktorá indikuje to, či s daným DVD môžu z FE manipulovať (úprava, mazanie).

### MembersController.cs
**Repository/MemberRepository.cs**
**api/Members**
Obsahuje 5 endpointov na klasické CRUD operácie ako je GetMembers(), GetMember(), CreateMember(), UpdateMember(), DeleteMember(). K tomuto kontroléru patria 3 dátové modely a to:
- Member - tabuľka
- MemberDto - dátový model pre vytváranie a úpravu člena (Member), POST a PUT (bez ID, ktoré vkladá databáza)
- MemberRequestModel 
    - dátový model na GET requesty, z toho dôvodu, že v Member sa nachádza boolean vlastnosť "CanManipulate", ktorá indikuje to, či s daným členom (member) môžu z FE manipulovať (úprava, mazanie).

### MessagesController.cs
**Repository/MessageRepository.cs**
**api/Messages**
Obsahuje 3 endpointy na GET operácie ako je GetMessages(), GetMessage(), GetMessagesByUserId(). K tomuto kontroléru patria 3 dátové modely a to:
- Message - tabuľka
Slúži ako notifikácie o objednaní / vrátení / predĺžení objednávky. Taktiež uvítacia notifikácia po pridaní užívateľa / užívateľ si niečo objednal / vrátil / predlžil objednávku (prolong).

### QueueItemsController.cs
**Repository/QueueItemRepository.cs**
**api/QueueItems**
Obsahuje 2 endpointy na GET operácie ako je GetQueueItems(), GetAllQueueItemsByMember(). K tomuto kontroléru patria 3 dátové modely a to:
- QueueItem - tabuľka
- QueueItemRequestModel - 
    - dátový model na GET requesty, z toho dôvodu, že v QueueItem sa nachádzajú modely Member a Title s boolean vlastnosťou 
    "CanManipulate", ktorá indikuje to, či s daným členom (member) môžu z FE manipulovať (úprava, mazanie).
Slúži ako poradovník, z dôvodu minutia objednávok pre danú knihu / DVD. 
Ak sa minú dostupné kusy (Available Copies), tak sa ďalší člen na tú danú knihu / DVD pridá do poradovníka.
Keď člen vráti objednávku, tak z toho poradovníka sa prvý v poradí na tú knihu zmaže, ale NEOBJEDNÁ SA. 
(na posudenie, či hneď po odstránení z QueueItems či hneď sa objedná alebo sa to musí spraviť manualne)

### RentalEntriesController.cs
**Repository/RentalEntryRepository.cs**
**api/RentalEntries**
Obsahuje 5 endpointov na klasické CRUD operácie ako je GetDvds(), GetDvd(), CreateDvd(), UpdateDvd(), DeleteDvd(). K tomuto kontroléru patria 3 dátové modely a to:
- RentalEntry - tabuľka
- RentalEntryDto - dátový model pre vytváranie a úpravu DVD, POST a PUT (bez ID, ktoré vkladá databáza)
- RentalEntriesRequestModel 
    - dátový model na GET requesty, z toho dôvodu, že v RentalEntry sa nachádzajú modely Member a Title s boolean vlastnosťou 
    "CanManipulate", ktorá indikuje to, či s daným členom (member) môžu z FE manipulovať (úprava, mazanie).

------------------------------------------------------------------------------------------
## DataContext
### LibraryContext.cs
Tu sa nachádza trieda LibraryContext, ktorá reprezentuje databázu. 
V nej sa nachádzajú properties generického dátového typu DbSet, ktoré reprezenetujú tabuľky. 
**POZOR!! Book a Dvds sú súčasťou jednej tabuľky Title, pretože obe triedy (Book, Dvd) dedia z triedy Title a v triede Title sa nachádza väčšina rovnakých vlastností (properties) pre Dvd a Book.**
------------------------------------------------------------------------------------------
**Tabuľky**
-   Title (Book a Dvds)
-   Members
-   QueueItems
-   RentalEntries
-   Messages
-   RequestLogs

**Metóda OnModelCreating()**
V metóde OnModelCreating sa pri inicializácii prvotnej migrácie naplnia tabuľky dátami pre tabuľky Title (20ks kníh a 20ks DVD) a Member (20ks).

------------------------------------------------------------------------------------------
## Middlewares
**RequestLoggingMiddleware.cs**
Middleware sa používa **pri každej POST a PUT požiadavke**. 
Do databázy do tabuľky RequesLogs sa ukladajú informácie o požiadavke a to konkrétne:
- HttpMethod (POST, PUT)
- RequestPath - URL cesta, kde bola požiadavka vykonaná
- IpAddress - ip adresa počítača, z ktorého požiadavka išla (ipv4 / ipv6)
- TimeStamp - dátumový a časový údaj, kedy bola požiadavka vykonaná
- UserAgent - prehliadač
- StatusCode - serverový kód alebo teda Http kód odpovedi servera
- ResponseBody - odpoveď zo servera
- RequestBody - telo požiadavky od užívateľa (frontend)

------------------------------------------------------------------------------------------
## Migrations
V tomto priečinku sa nachádzajú migračné skripty a Snapshot, ktorý znázorňuje databázovú schému.

------------------------------------------------------------------------------------------
## Models
- Tu sa nachádzajú dátové modely ako sú už spomenuté tabuľky (Book, Dvd, Member,....). 
- Ďalej v priečinku **DTOs** (data transfer object), v ktoré sú tabuľkové formáty len bez ID, pretože ten vkladá databáza.
- **Helper** tu sa nachádza súbor TitleReturnedEventArgs, ktorý slúži ako dátový model pre event argumenty pre vrátené objednávky.
-  V **RequestModels** sa nachádzajú dátové typy podľa DTOs, kde sa nenachádza property **CanManipulate** spomenuté vyššie.

------------------------------------------------------------------------------------------
## Repository
Tu sa nachádzajú repozitáre na komunikáciu a manažment s databázou. Ďalej je tu priečinok **Interfaces** kde sa nachádzajú rozhrania alebo teda interfaces ako z názvu vyplýva. Je to z dôvodu, že v projekte sa používa **repository pattern**. 

------------------------------------------------------------------------------------------
## Service
V priečinku Service sa nachádzajú servisy ako 
- DatabaseBackupServise na zálohovanie databázy
- MessagingService na odosielanie notifikácii alebo teda správ
- QueueService na dodatočné manažovanie poradovníka (QueueItem tabuľka)
- RentalEntryService na manažovanie logiky z kontrolera RentalEntriesController
- RequestLogService na ukladanie dát do RequsetLogs tabuľky

Opäť ako v repository sa tu nachádzajú aj rozhrania v priečinku IServices len pre niektoré servisy opäť pre repository pattern.

------------------------------------------------------------------------------------------