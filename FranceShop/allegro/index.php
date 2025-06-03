<?php
ini_set('display_errors',1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$userID='5416';
$token='714ecb076db749bcb886df0768fed6ff';
//$uri="https://api.allegro.pl/offers/listing?seller.id=".$userID;
$uri = "https://allegro.pl/auth/oauth/token?grant_type=authorization_code&code=".$_GET['code'];
$headers = 'Authorization: Basic NzE0ZWNiMDc2ZGI3NDliY2I4ODZkZjA3NjhmZWQ2ZmY6MVBSVXRYNEVvU29LVVRRMTBPZ3d0TldnTVR3QTdRN0xLaGtlWmtSNkVvaDA2SlJ1a3p2N2M0bTNPUzZ5Nnh2Uw==';


/*$headers = [
      'Accept: application/vnd.allegro.public.v1+json;charset=UTF-8',
      'Content-Type: application/vnd.allegro.public.v1+json',
      'Authorization: Bearer '.$token,
	  'Accept-Language: PL'
];*/

$curl = curl_init($uri);
curl_setopt($curl, CURLOPT_POST, 1);
//curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
   
$wynik = curl_exec($curl);

curl_close($curl);

echo "Wynik zapytania:<br>";

print $wynik;
?>