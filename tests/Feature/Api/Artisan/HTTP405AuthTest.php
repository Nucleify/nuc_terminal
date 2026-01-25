<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('terminal-api-405');
uses()->group('terminal-api-405-auth');
uses()->group('api-405');
uses()->group('api-405-auth');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Authorized', function (): void {
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
