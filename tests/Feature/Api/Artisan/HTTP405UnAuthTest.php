<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('terminal-api-405');
uses()->group('terminal-api-405-unauth');
uses()->group('api-405');
uses()->group('api-405-unauth');

describe('405 > Unauthorized', function (): void {
    apiTestArray([
        'put without parameter > run command api' => [
            'method' => 'PUT',
            'route' => 'artisan.run',
            'status' => 405,
            'json' => false,
        ],
        'put json without parameter > run command api' => [
            'method' => 'PUT',
            'route' => 'artisan.run',
            'status' => 405,
        ],
        'delete without parameter > run command api' => [
            'method' => 'DELETE',
            'route' => 'artisan.run',
            'status' => 405,
            'json' => false,
        ],
        'delete json without parameter > run command api' => [
            'method' => 'DELETE',
            'route' => 'artisan.run',
            'status' => 405,
        ],
        'put with parameter > run command api' => [
            'method' => 'PUT',
            'route' => 'artisan.run',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put json with parameter > run command api' => [
            'method' => 'PUT',
            'route' => 'artisan.run',
            'status' => 405,
            'id' => 1,
        ],
        'delete with parameter > run command api' => [
            'method' => 'DELETE',
            'route' => 'artisan.run',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'delete json with parameter > run command api' => [
            'method' => 'DELETE',
            'route' => 'artisan.run',
            'status' => 405,
            'id' => 1,
        ],
    ]);
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable');
