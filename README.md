<h1 align="center">
    <b>
        <br>
        #  Tugas Besar 2 IF3110 Pengembangan Aplikasi Berbasis Web
        <br>
    </b>
</h1>

<h2 align="center">
    <b>
        <br>
        Engima Remake
        <br>
        <br>
    </b>
</h2>

## Deskripsi Singkat

Setelah aplikasi web Engima diluncurkan, bioskop Engi menjadi sangat laku. Sebelumnya, Engi mengurus semua transaksi tiket film dan penambahan data film secara manual. Karena kewalahan, akhirnya Engi pergi ke seorang konsultan IT untuk menemukan solusi dari permasalahannya. Konsultan menyarankan Engi untuk menggunakan web service untuk mempermudah pekerjaannya. Melihat aplikasi web yang sudah dibuat memuaskan, Engi ingin mengimplementasikan perubahan tersebut beserta web service dan aplikasi Bank yang digunakan untuk transaksi tiket film di Engima.

Website ini dibuat dengan menggunakan Javascript, HTML dan CSS untuk frontend dan menggunakan bahasa PHP untuk backend. Aplikasi Bank dibuat dengan menggunakan ReactJS. Web Service Bank dibuat di atas java servlet dengan menggunakan JAX-WS dengan protokol SOAP. Web Service Transaksi dibuat di atas java servlet dengan menggunakan Node.js dengan protokol REST. Serta MySQL untuk penyimpanan data pada basis data (data film yang ditampilkan dari API TheMovieDB).

<br>

## Requirement
| Nomor | Requirement                | Penjelasan                                                   |
|:-----:|:---------------------------|:-------------------------------------------------------------|
| 1.    | XAMPP                      | Dibutuhkan untuk menjalankan database MySQL                  |
| 2.    | PHP                        | Dibutuhkan untuk menjalankan program backend engima          |
| 3.    | Browser (support html 2.0) | Dibutuhkan sebagai sarana utama menjalankan frontend Engima  |

<br>

## Cara Instalasi
1. Download/Clone Engima dari git pada folder engi_cinema
2. Pastikan posisi folder engi_cinema berada pada path ..\xampp\htdocs\
3. Jalankan modul Apache dan MySQL pada XAMPP
4. Jalankan http://localhost/engi_cinema/ pada browser pilihan

<br>

## Cara Menjalankan Server
1. Jalankan modul Apache dan MySQL pada XAMPP
2. Pastikan folder engi_cinema berada pada path ..\xampp\htdocs\

<br>

## Perubahan Basis Data Engima

| Number | Relasi | Status     |
|:------:|:-------|:-----------|
| 1.     | Film   | Dihapus    |

<br>

## Screenshots Perubahan Tampilan Engima

### Transaction History

![](screenshots/)
<br>
<br>
![](screenshots/)
<br>
<br>
![](screenshots/)
<br>
<br>

### Film Detail
![](screenshots/)
<br>
<br>
![](screenshots/)
<br>
<br>

<br>

## Keterangan Tambahan

* Jam pada aplikasi web mengacu pada jam lokal pengguna.
* Waktu transaksi yang digunakan adalah waktu lokal.
* Basis data menggunakan MySQL.

<br>

## Knowledge

Beberapa teknik yang digunakan pada pengerjaan tugas kali ini

|              | Kata Kunci                                                                           |
| ------------ | ------------------------------------------------------------------------------------ |
| HTTP methods | get, post, put, delete, response, onload                                             |
| CSS          | margin, padding, font-size, text-align, flex, grid, border, color, div, span         |
| Javascript   | XMLHTTPRequest, addEventListener, FormData, createElement, appendChild, parentNode   |
| PHP          | PDO, $_GET, $_POST, $_COOKIE, var_dump, print_r, echo, require, fungsi header        |
| SQL query    | SELECT, INSERT, UPDATE, DELETE, WHERE, operator LIKE                                 |

<br>

## Pembagian Tugas

### REST
| Number | Feature                      | Assignment         |
|:------:|:-----------------------------|:-------------------|
| 1.     | Get user transactions        | 13517137           |
| 2.     | Add transactions             | 13517137           |
| 3.     | Update transaction status    | 13517137           |

### SOAP
| Number | Feature                      | Assignment         |
|:------:|:-----------------------------|:-------------------|
| 1.     | Login                        | 13517137           |

### ReactJS
| Number | Feature                      | Assignment         |
|:------:|:-----------------------------|:-------------------|
| 1.     | Title                        | 13517137           |
| 2.     | Login                        | 13517137           |

### Perubahan Engima
| Number | Feature                      | Assignment         |
|:------:|:-----------------------------|:-------------------|
| 1.     | Homepage                     | 13517137           |
| 2.     | Movies Detail                | 13517137           |
| 3.     | Search                       | 13517137           |

<p align="center">
    <b>
        <br>
        <font size="6">
            About
        </font>
    </b>
</p>

<p align="center">
    <b>
        IF3110-Pengembangan Aplikasi Berbasis Web - 2019
        <br>
        Teknik Informatika 2017
        <br>
        <br>
        13517137 - Vincent Budianto
    </b>
</p>