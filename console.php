<?
error_reporting(E_ALL);
ini_set('display_errors', 'On');
require_once('class.Oasis_Console.php');
require_once('class.Mirage_Console.php');

$data = $_POST['command'];

new Mirage_Console($data);