<?php

namespace Home\Controller;

use Think\Controller;
use Home\Model;

header("Content-type: text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST , GET');

class CurrencyController extends Controller
{

    function upimg()
    {


        if ($_FILES["file"]["error"]) {
            echo $_FILES["file"]["error"];
        } else {
            //没有出错
            //加限制条件
            //判断上传文件类型为png或jpg且大小不超过1024000B
            if (($_FILES["file"]["type"] == "image/png" || $_FILES["file"]["type"] == "image/jpeg") && $_FILES["file"]["size"] < 1024000) {
                //防止文件名重复
                $filename = "./Upload/" . time() . $_FILES["file"]["name"];
                $filesn = "/Upload/" . time() . $_FILES["file"]["name"];
                //转码，把utf-8转成gb2312,返回转换后的字符串， 或者在失败时返回 FALSE。
                $filename = iconv("UTF-8", "gb2312", $filename);
                //检查文件或目录是否存在
                if (file_exists($filename)) {
                    echo "该文件已存在";
                } else {
                    //保存文件,   move_uploaded_file 将上传的文件移动到新位置
                    move_uploaded_file($_FILES["file"]["tmp_name"], $filename);//将临时地址移动到指定地址
                    $newf = 'http://' . $_SERVER['SERVER_NAME'] . $filesn;
                    $datamap = $_POST;
                    $datamap['img'] = $newf;
                    $datamap['states'] = 1;
                    $datamap['float_start'] = $datamap['defloat'];
                    $datamap['money_start'] = $datamap['money'];


                    $res = M('currency')->add($datamap);

                    if ($res)
                    {
                        $this->success('提交成功', 'add', 3);
                    }
                    else
                    {
                        $this->error('提交失败');
                    }


                }
            } else {
                echo "文件类型不对";
            }

        }

    }

}