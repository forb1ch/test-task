<?php
use Twig\Loader\FilesystemLoader;
use Twig\Environment;

// Load our autoloader
require_once __DIR__ . '/vendor/autoload.php';

// Specify our Twig templates location
$loader = new FilesystemLoader(__DIR__ . '/app/templates');

// Instantiate our Twig
$twig = new Environment($loader);
// Render our view
echo $twig->render('html.html.twig', ['title' => 'Test task', 'subtitle' => 'Please select one font']);