<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('terminal-api-401');
uses()->group('api-401');

describe('401', function (): void {
    apiTestArray([
        'migrate:rollback command' => [
            'method' => 'POST',
            'route' => 'artisan.run',
            'status' => 401,
            'data' => ['command' => 'migrate:rollback'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'migrate command' => [
            'method' => 'POST',
            'route' => 'artisan.run',
            'status' => 401,
            'data' => ['command' => 'migrate'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'migrate:fresh command' => [
            'method' => 'POST',
            'route' => 'artisan.run',
            'status' => 401,
            'data' => ['command' => 'migrate:fresh'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'migrate:fresh --seed command' => [
            'method' => 'POST',
            'route' => 'artisan.run',
            'status' => 401,
            'data' => ['command' => 'migrate:fresh --seed'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
    ]);
});
