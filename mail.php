<?php


  // Вспомогательная функция для отправки почтового сообщения с вложением (Trianon)
  function send_mail($mail_to, $thema, $html, $path)   
  { if ($path) {  
    $fp = fopen($path,"rb");   
    if (!$fp)   
    { print "Cannot open file";   
      exit();   
    }   
    $file = fread($fp, filesize($path));   
    fclose($fp);   
    }  
    $name = $path; // в этой переменной надо сформировать имя файла (без всякого пути)  
    $boundary = "--".md5(uniqid(time()));  // любая строка, которой не будет ниже в потоке данных.  
    $headers  = "MIME-Version: 1.0;". PHP_EOL;
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"". PHP_EOL;
    $headers .= 'From: Доставка цветов в подарочных коробках <'.$mail_to.'>' . PHP_EOL;
	$headers .= 'Reply-To: '.$mail_to.'' . PHP_EOL;
      
    $multipart  = "--$boundary" . PHP_EOL;   
    $multipart .= "Content-Type: text/html; charset=utf-8" . PHP_EOL;   
    $multipart .= "Content-Transfer-Encoding: base64". PHP_EOL;   
    $multipart .= PHP_EOL; // раздел между заголовками и телом html-части 
    $multipart .= chunk_split(base64_encode($html));   

    $multipart .= PHP_EOL ."--$boundary" . PHP_EOL;   
    $multipart .= "Content-Type: application/octet-stream; name=\"$name\"". PHP_EOL;   
    $multipart .= "Content-Transfer-Encoding: base64". PHP_EOL;   
    $multipart .= "Content-Disposition: attachment; filename=\"$name\"". PHP_EOL;   
    $multipart .= PHP_EOL; // раздел между заголовками и телом прикрепленного файла 
    $multipart .= chunk_split(base64_encode($file));   

    $multipart .= PHP_EOL . "--$boundary--" . PHP_EOL;   
      
        if(!mail($mail_to, $thema, $multipart, $headers))   
         {return False;           //если не письмо не отправлено
      }  
    else { //// если письмо отправлено
    return True;  
    }  
  exit;  
  }


//Script Foreach
$c = true;
$picture = "";
$path = "";
$message = "";
	// Если поле выбора вложения не пустое - закачиваем его на сервер 
	if (!empty($_FILES['mail_file']['tmp_name'])) 
	{ 
		// Закачиваем файл 
		$path = $_FILES['mail_file']['name'];
		if (copy($_FILES['mail_file']['tmp_name'], $path)) $picture = $path; 
	}

	$project_name = "Доставка цветов в подарочных коробках";
	$admin_email  = "Scarletflowers@bk.ru";
	$form_subject = "Заказ цветов";

	foreach ( $_POST as $key => $value ) {
		if ( $value != "" && $key != "mail_file" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
			<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
			<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
		</tr>
		";
		}
	}

$message = "<table style='width: 100%;'>$message</table>";

function adopt($text) {
	return '=?UTF-8?B?'.base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

if(empty($picture)) mail($admin_email, adopt($form_subject), $message, $headers );
else send_mail($admin_email, $form_subject, $message, $picture); 

if($path) unlink ($picture);
  
