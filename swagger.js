const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 8000;

const options = {
    definition: {
        "openapi": "3.0.3",
        "info": {
            "title": "Name Day API",
            "version": "1.0.0",
            "description": "API that provides name day information for the entire year, with filtering options by month, date, and country.",
            "termsOfService": "https://karoly-git.github.io/name-day-frontend/",
            "contact": {
                "name": "Karoly Hornyak",
                "email": "karoly.webdev@gmail.com",
                "url": "https://karolyhornyak.com"
            }
        },
        "paths": {
            "/api/v1/namedays": {
                "summary": "Retrieve name day data for the entire year",
                "description": "Returns name day information for the entire year across all available countries.",
                "get": {
                    "summary": "Get name day data for the entire year",
                    "operationId": "getNameDaysForYear",
                    "tags": [
                        "Name Days"
                    ],
                    "responses": {
                        "200": {
                            "description": "Successful response",
                            "content": {
                                "application/json": {
                                    "examples": {
                                        "SampleNameDaysResponse": {
                                            "value": {
                                                "january": {
                                                    "1": {
                                                        "hu": [
                                                            "Fruzsina"
                                                        ],
                                                        "pl": [
                                                            "Mieczysław",
                                                            "Mieszko"
                                                        ]
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/namedays/{month}": {
                "summary": "Retrieve name day data by month",
                "get": {
                    "summary": "Get name day data by month",
                    "operationId": "getNameDaysByMonth",
                    "tags": [
                        "Name Days"
                    ],
                    "parameters": [
                        {
                            "$ref": "#/components/parameters/MonthParam"
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Successful response",
                            "content": {
                                "application/json": {
                                    "examples": {
                                        "MonthlyNameDaysResponse": {
                                            "value": {
                                                "1": {
                                                    "hu": [
                                                        "Fruzsina"
                                                    ],
                                                    "pl": [
                                                        "Mieczysław",
                                                        "Mieszko"
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/namedays/{month}/{date}": {
                "summary": "Retrieve name day data by month and date",
                "get": {
                    "summary": "Get name day data by month and date",
                    "operationId": "getNameDaysByMonthAndDate",
                    "tags": [
                        "Name Days"
                    ],
                    "parameters": [
                        {
                            "$ref": "#/components/parameters/MonthParam"
                        },
                        {
                            "$ref": "#/components/parameters/DateParam"
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Successful response",
                            "content": {
                                "application/json": {
                                    "examples": {
                                        "DailyNameDaysResponse": {
                                            "value": {
                                                "hu": [
                                                    "Fruzsina"
                                                ],
                                                "pl": [
                                                    "Mieczysław",
                                                    "Mieczysława",
                                                    "Mieszko"
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v1/namedays/{month}/{date}/{country}": {
                "summary": "Retrieve name day data by month, date, and country",
                "get": {
                    "summary": "Get name day data by month, date, and country",
                    "operationId": "getNameDaysByMonthDateAndCountry",
                    "tags": [
                        "Name Days"
                    ],
                    "parameters": [
                        {
                            "$ref": "#/components/parameters/MonthParam"
                        },
                        {
                            "$ref": "#/components/parameters/DateParam"
                        },
                        {
                            "$ref": "#/components/parameters/CountryParam"
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Successful response",
                            "content": {
                                "application/json": {
                                    "examples": {
                                        "CountryDailyNameDaysResponse": {
                                            "value": [
                                                "Fruzsina"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "components": {
            "parameters": {
                "MonthParam": {
                    "name": "month",
                    "in": "path",
                    "required": true,
                    "description": "Month name",
                    "schema": {
                        "type": "string",
                        "enum": [
                            "january",
                            "february",
                            "march",
                            "april",
                            "may",
                            "june",
                            "july",
                            "august",
                            "september",
                            "october",
                            "november",
                            "december"
                        ]
                    },
                    "example": "january"
                },
                "DateParam": {
                    "name": "date",
                    "in": "path",
                    "required": true,
                    "description": "Day of the month (1–31)",
                    "schema": {
                        "type": "integer",
                        "minimum": 1,
                        "maximum": 31
                    },
                    "example": 1
                },
                "CountryParam": {
                    "name": "country",
                    "in": "path",
                    "required": true,
                    "description": "ISO 2-letter country code",
                    "schema": {
                        "type": "string",
                        "minLength": 2,
                        "maxLength": 2
                    },
                    "example": "hu"
                }
            }
        },
        "servers": [
            {
                "url": "http://localhost:{port}",
                "description": "Developer local server",
                "variables": {
                    "port": {
                        "default": "8000",
                        "enum": [
                            "3000",
                            "8000"
                        ]
                    }
                }
            },
            {
                "url": "https://name-day-backend-0d74dcea0ed2.herokuapp.com",
                "description": "Production Heroku server"
            }
        ]
    },

    // Scan files that contain @openapi blocks
    apis: [],
};

module.exports = swaggerJSDoc(options);
