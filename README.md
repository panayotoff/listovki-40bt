# Листовки за капитанско право

Проекта е за лично ползване - не успях да намеря къде да упражнявам въпросите за капитанско право. Цялата информация е взета от https://www.marad.bg/sites/default/files/upload/documents/2019-09/Vyprosi_40BT_14012016.pdf

При намерени неточности, пуснете PR

Приложението е уеб сайт за упражнения върху въпросите за изпит 40БТ. Работи локално в браузъра: търсене по номер или текст, тест от 60 случайни въпроса и тематични тестове по 20 въпроса.

## Какво ви трябва

- [Node.js](https://nodejs.org/) версия 20 или по-нова (заедно с него идва и `npm`)
- Съвременен браузър (Chrome, Firefox, Edge)

Проверете, че са инсталирани:

```bash
node -v
npm -v
```

Ако командите връщат версии, можете да продължите. Ако пише, че командата не е намерена, първо инсталирайте Node.js (вижте секцията за вашата система по-долу).

## Linux

### Инсталиране на Node.js

На Ubuntu, Debian и подобни дистрибуции:

```bash
sudo apt update
sudo apt install -y nodejs npm
```

Пакетите от хранилището на дистрибуцията понякога са стари. Ако `node -v` показва версия под 20, инсталирайте актуална версия от [nodejs.org](https://nodejs.org/) или чрез [nvm](https://github.com/nvm-sh/nvm):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Затворете и отворете терминала отново, после:

```bash
nvm install --lts
```

### Стартиране

Отворете терминал в папката на проекта (там, където е файлът `package.json`). Ако сте изтеглили архива в `Downloads`:

```bash
cd ~/Downloads/decompression/listovki-40bt
```

Инсталирайте зависимостите (веднъж, или след като се промени `package.json`):

```bash
npm install
```

Стартирайте приложението:

```bash
npm run dev
```

В терминала ще се появи адрес, обикновено `http://localhost:5173`. Отворете го в браузъра.

Спиране: в терминала натиснете `Ctrl+C`.

## Windows

### Инсталиране на Node.js

1. Отворете [https://nodejs.org/](https://nodejs.org/) и изтеглете **LTS** инсталатора за Windows.
2. Пуснете инсталатора и оставете настройките по подразбиране (включително опцията да се добави към PATH).
3. Затворете и отворете отново PowerShell или Command Prompt.
4. Проверете:

```powershell
node -v
npm -v
```

### Стартиране

1. Отворете **PowerShell** или **Command Prompt**.
2. Отидете в папката на проекта. Ако архивът е в `Downloads`:

```powershell
cd $env:USERPROFILE\Downloads\decompression\listovki-40bt
```

В Command Prompt (`cmd`) същата стъпка е:

```cmd
cd %USERPROFILE%\Downloads\decompression\listovki-40bt
```

Ако папката е другаде, заменете пътя с вашия. Можете и да отворите папката във File Explorer, да щракнете с десен бутон в празно място и да изберете **Open in Terminal**.

3. Инсталирайте зависимостите (веднъж):

```powershell
npm install
```

4. Стартирайте приложението:

```powershell
npm run dev
```

5. В терминала ще се появи адрес, обикновено `http://localhost:5173`. Отворете го в браузъра.

Спиране: в терминала натиснете `Ctrl+C`. Ако Windows пита дали да прекрати процеса, потвърдете с `Y`.

Ако PowerShell блокира изпълнението на скриптове, командите `npm` пак трябва да работят. Ако видите грешка за execution policy, пуснете PowerShell като обикновен потребител и изпълнете:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## Други команди

| Команда | Какво прави |
|---|---|
| `npm start` | Същото като `npm run dev` |
| `npm run build` | Създава готова за публикуване версия в папката `dist/` |
| `npm run preview` | Пуска локално вече изградената версия от `dist/` |
| `npm run lint` | Проверява кода с ESLint |

`npm run preview` се пуска след успешен `npm run build`. Адресът обикновено е `http://localhost:4173`.
