---
sidebar_position: 5
sidebar_label: API
---

# API



<h1 id="core-api">Core API v1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="http://localhost:33333/api/">http://localhost:33333/api/</a>

# Authentication

- HTTP Authentication, scheme: bearer * Users access: "Authorization: Bearer <user_token>"

<h1 id="core-api-south-bound-plugin">South Bound Plugin</h1>

## Get random properties

`GET /plugin/southBound/random`

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "default": "random"
    },
    "channels": {
      "type": "object",
      "properties": {
        "max": {
          "type": "string",
          "default": "REAL"
        },
        "min": {
          "type": "string",
          "default": "REAL"
        }
      }
    },
    "protocols": {
      "type": "object",
      "properties": {
        "seed": {
          "type": "string",
          "default": "REAL"
        }
      }
    }
  }
}
```

<h3 id="get-random-properties-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Random](#schemarandom)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="core-api-plugin">Plugin</h1>

## Get list of sound bound plugin

`GET /plugin/southBound`

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "anyOf": [
      {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "example": "random"
          },
          "channels": {
            "additionalProperties": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "INTEGER",
                    "STRING",
                    "BOOLEAN",
                    "REAL",
                    "DECIMAL",
                    "DATES",
                    "BLOBS",
                    "ENUM"
                  ]
                },
                "defaultValue": {
                  "type": "string"
                },
                "values": {
                  "type": "array"
                },
                "unique": {
                  "type": "string"
                },
                "allowNull": {
                  "type": "boolean"
                },
                "label": {
                  "type": "string"
                },
                "placeholder": {
                  "type": "string"
                }
              }
            }
          },
          "protocols": {
            "additionalProperties": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "INTEGER",
                    "STRING",
                    "BOOLEAN",
                    "REAL",
                    "DECIMAL",
                    "DATES",
                    "BLOBS",
                    "ENUM"
                  ]
                },
                "defaultValue": {
                  "type": "string"
                },
                "values": {
                  "type": "array"
                },
                "unique": {
                  "type": "string"
                },
                "allowNull": {
                  "type": "boolean"
                },
                "label": {
                  "type": "string"
                },
                "placeholder": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    ]
  }
}
```

<h3 id="get-list-of-sound-bound-plugin-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="get-list-of-sound-bound-plugin-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» name|string|false|none|none|
|» channels|object|false|none|none|
|»» **additionalProperties**|object|false|none|none|
|»»» type|string|false|none|none|
|»»» defaultValue|string|false|none|none|
|»»» values|array|false|none|none|
|»»» unique|string|false|none|none|
|»»» allowNull|boolean|false|none|none|
|»»» label|string|false|none|none|
|»»» placeholder|string|false|none|none|
|» protocols|object|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|INTEGER|
|type|STRING|
|type|BOOLEAN|
|type|REAL|
|type|DECIMAL|
|type|DATES|
|type|BLOBS|
|type|ENUM|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## Get list of plugin

`GET /plugin`

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "southBound": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "example": "random"
          },
          "channels": {
            "additionalProperties": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "INTEGER",
                    "STRING",
                    "BOOLEAN",
                    "REAL",
                    "DECIMAL",
                    "DATES",
                    "BLOBS",
                    "ENUM"
                  ]
                },
                "defaultValue": {
                  "type": "string"
                },
                "values": {
                  "type": "array"
                },
                "unique": {
                  "type": "string"
                },
                "allowNull": {
                  "type": "boolean"
                },
                "label": {
                  "type": "string"
                },
                "placeholder": {
                  "type": "string"
                }
              }
            }
          },
          "protocols": {
            "additionalProperties": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "INTEGER",
                    "STRING",
                    "BOOLEAN",
                    "REAL",
                    "DECIMAL",
                    "DATES",
                    "BLOBS",
                    "ENUM"
                  ]
                },
                "defaultValue": {
                  "type": "string"
                },
                "values": {
                  "type": "array"
                },
                "unique": {
                  "type": "string"
                },
                "allowNull": {
                  "type": "boolean"
                },
                "label": {
                  "type": "string"
                },
                "placeholder": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "northBound": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "protocols": {
            "additionalProperties": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "INTEGER",
                    "STRING",
                    "BOOLEAN",
                    "REAL",
                    "DECIMAL",
                    "DATES",
                    "BLOBS",
                    "ENUM"
                  ]
                },
                "defaultValue": {
                  "type": "string"
                },
                "values": {
                  "type": "array"
                },
                "unique": {
                  "type": "string"
                },
                "allowNull": {
                  "type": "boolean"
                },
                "label": {
                  "type": "string"
                },
                "placeholder": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    }
  }
}
```

<h3 id="get-list-of-plugin-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="get-list-of-plugin-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» southBound|[[SouthBoundPlugin](#schemasouthboundplugin)]|false|none|none|
|»» name|string|false|none|none|
|»» channels|object|false|none|none|
|»»» **additionalProperties**|object|false|none|none|
|»»»» type|string|false|none|none|
|»»»» defaultValue|string|false|none|none|
|»»»» values|array|false|none|none|
|»»»» unique|string|false|none|none|
|»»»» allowNull|boolean|false|none|none|
|»»»» label|string|false|none|none|
|»»»» placeholder|string|false|none|none|
|»» protocols|object|false|none|none|
|» northBound|[object]|false|none|none|
|»» name|string|false|none|none|
|»» protocols|object|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|INTEGER|
|type|STRING|
|type|BOOLEAN|
|type|REAL|
|type|DECIMAL|
|type|DATES|
|type|BLOBS|
|type|ENUM|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="core-api-devices">Devices</h1>

## Create new device

`POST /device/`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "example": "Device 1"
    },
    "modelName": {
      "type": "string",
      "example": "Model 1"
    },
    "manufacturer": {
      "type": "string",
      "example": "Back Khoa"
    },
    "type": {
      "type": "string",
      "example": "Power Meter"
    },
    "upProtocol": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "Connection 1"
        },
        "plugin": {
          "type": "string",
          "example": "mainflux"
        }
      }
    },
    "downProtocol": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "Modbus connection 1"
        },
        "plugin": {
          "type": "string",
          "example": "modbus-rtu"
        }
      }
    },
    "channels": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "example": "Channel 1"
          },
          "readWrite": {
            "type": "string",
            "enum": [
              "R",
              "W",
              "RW"
            ],
            "default": "R"
          },
          "offset": {
            "type": "number",
            "default": 0
          },
          "scale": {
            "type": "number",
            "default": 1
          }
        }
      }
    }
  }
}
```

<h3 id="create-new-device-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|false|none|
|» modelName|body|string|false|none|
|» manufacturer|body|string|false|none|
|» type|body|string|false|none|
|» upProtocol|body|object|false|none|
|»» name|body|string|false|none|
|»» plugin|body|string|false|none|
|» downProtocol|body|object|false|none|
|»» name|body|string|false|none|
|»» plugin|body|string|false|none|
|» channels|body|[object]|false|none|
|»» name|body|string|false|none|
|»» readWrite|body|string|false|none|
|»» offset|body|number|false|none|
|»» scale|body|number|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|»» readWrite|R|
|»» readWrite|W|
|»» readWrite|RW|

<h3 id="create-new-device-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## Delete device by ID

`DELETE /device/`

<h3 id="delete-device-by-id-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|number|false|device id|

<h3 id="delete-device-by-id-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Some thing wrong|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get device by id or name

`GET /device/`

<h3 id="get-device-by-id-or-name-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|number|false|device id|
|name|query|string|false|device name|

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "example": 1
      },
      "name": {
        "type": "string",
        "example": "Device 1"
      },
      "modelName": {
        "type": "string",
        "example": "Model 1"
      },
      "manufacturer": {
        "type": "string",
        "example": "Back Khoa"
      },
      "type": {
        "type": "string",
        "example": "Power Meter"
      },
      "status": {
        "type": "string",
        "enum": [
          "dormant",
          "active"
        ]
      },
      "createdAt": {
        "type": "string",
        "format": "date-time"
      },
      "updateAt": {
        "type": "string",
        "format": "date-time"
      },
      "upProtocol": {
        "type": "object"
      },
      "downProtocol": {
        "type": "object"
      }
    }
  }
}
```

<h3 id="get-device-by-id-or-name-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="get-device-by-id-or-name-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Device](#schemadevice)]|false|none|none|
|» id|number|false|none|none|
|» name|string|false|none|none|
|» modelName|string|false|none|none|
|» manufacturer|string|false|none|none|
|» type|string|false|none|none|
|» status|string|false|none|none|
|» createdAt|string(date-time)|false|none|none|
|» updateAt|string(date-time)|false|none|none|
|» upProtocol|object|false|none|none|
|» downProtocol|object|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|dormant|
|status|active|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## Get devices status sumary

`GET /devices/status`

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "active": {
      "type": "number",
      "example": 0
    },
    "dormant": {
      "type": "number",
      "example": 1
    },
    "total": {
      "type": "number",
      "example": 1
    }
  }
}
```

<h3 id="get-devices-status-sumary-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="get-devices-status-sumary-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» active|number|false|none|none|
|» dormant|number|false|none|none|
|» total|number|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## Query all devices

`GET /devices/`

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "limit": {
      "type": "number",
      "example": 10
    },
    "start": {
      "type": "number",
      "example": 0
    },
    "total": {
      "type": "number",
      "example": 100
    },
    "devices": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "example": 1
          },
          "name": {
            "type": "string",
            "example": "Device 1"
          },
          "modelName": {
            "type": "string",
            "example": "Model 1"
          },
          "manufacturer": {
            "type": "string",
            "example": "Back Khoa"
          },
          "type": {
            "type": "string",
            "example": "Power Meter"
          },
          "status": {
            "type": "string",
            "enum": [
              "dormant",
              "active"
            ]
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updateAt": {
            "type": "string",
            "format": "date-time"
          },
          "upProtocol": {
            "type": "object"
          },
          "downProtocol": {
            "type": "object"
          }
        }
      }
    }
  }
}
```

<h3 id="query-all-devices-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="query-all-devices-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» limit|number|false|none|none|
|» start|number|false|none|none|
|» total|number|false|none|none|
|» devices|[[Device](#schemadevice)]|false|none|none|
|»» id|number|false|none|none|
|»» name|string|false|none|none|
|»» modelName|string|false|none|none|
|»» manufacturer|string|false|none|none|
|»» type|string|false|none|none|
|»» status|string|false|none|none|
|»» createdAt|string(date-time)|false|none|none|
|»» updateAt|string(date-time)|false|none|none|
|»» upProtocol|object|false|none|none|
|»» downProtocol|object|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|dormant|
|status|active|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="core-api-auth">Auth</h1>

## Check if user is logged in or not

`GET /auth/`

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "number",
      "example": 1
    },
    "username": {
      "type": "string",
      "example": "admin"
    },
    "role": {
      "type": "string",
      "example": "admin"
    }
  }
}
```

<h3 id="check-if-user-is-logged-in-or-not-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User logged in|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|User not logged in|None|

<h3 id="check-if-user-is-logged-in-or-not-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|number|false|none|none|
|» username|string|false|none|none|
|» role|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## Login or get access token

`POST /auth/`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "example": "admin"
    },
    "password": {
      "type": "string",
      "example": "admin"
    }
  }
}
```

<h3 id="login-or-get-access-token-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» username|body|string|false|none|
|» password|body|string|false|none|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "accessToken": {
      "type": "string",
      "example": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5NTM1MzY0fQ.Bj5LwN-vAozJmz-AIyoe4Ok-ENvj4iSaLtU43VwAslHi2diTP0zjVmNGSoULMQSw82hav6199UtapV_iMnp9tOsJYvoCfAeedryQErSkBGOiY6Lr-WGHQbUvcOn_evKXWWtqZCI0LZShrVM0XyS8gxP5l167T4w-g0qpNChIcvA"
    }
  }
}
```

<h3 id="login-or-get-access-token-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Incorrect username or password|None|

<h3 id="login-or-get-access-token-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» accessToken|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## Auth API for mqtt broker

`POST /auth/mqtt`

> Body parameter

```yaml
type: object
properties:
  username:
    type: string
    example: admin
  passsword:
    type: string
    example: admin
  clientid:
    description: JWT or default mqtt client id
    type: string
    example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5NTM1MzY0fQ.Bj5LwN-vAozJmz-AIyoe4Ok-ENvj4iSaLtU43VwAslHi2diTP0zjVmNGSoULMQSw82hav6199UtapV_iMnp9tOsJYvoCfAeedryQErSkBGOiY6Lr-WGHQbUvcOn_evKXWWtqZCI0LZShrVM0XyS8gxP5l167T4w-g0qpNChIcvA

```

<h3 id="auth-api-for-mqtt-broker-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» username|body|string|false|none|
|» passsword|body|string|false|none|
|» clientid|body|string|false|JWT or default mqtt client id|

<h3 id="auth-api-for-mqtt-broker-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid username password or clientid|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="core-api-users">Users</h1>

## Get User by ID or name

`GET /user`

<h3 id="get-user-by-id-or-name-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|number|false|user id|
|username|query|string|false|user name|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "example": "root"
    },
    "role": {
      "type": "string",
      "enum": [
        "admin"
      ],
      "example": "admin"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

<h3 id="get-user-by-id-or-name-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[UserDetail](#schemauserdetail)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## Delete user (soft delete ofcourse)

`DELETE /user`

<h3 id="delete-user-(soft-delete-ofcourse)-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|number|false|user id|
|username|query|string|false|user name|

<h3 id="delete-user-(soft-delete-ofcourse)-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User deleted|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## Create new user

`POST /user`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "example": "admin"
    },
    "password": {
      "type": "string",
      "example": "admin"
    },
    "role": {
      "type": "string",
      "example": "admin"
    }
  }
}
```

<h3 id="create-new-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[User](#schemauser)|false|none|
|» username|body|string|false|none|
|» password|body|string|false|none|
|» role|body|string|false|none|

<h3 id="create-new-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|Created|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Something wrong|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## Change passsword only

`PUT /user`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "oldPassword": {
      "type": "string",
      "example": "admin"
    },
    "newPassword": {
      "type": "string",
      "example": "newAdmin"
    }
  }
}
```

<h3 id="change-passsword-only-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» oldPassword|body|string|false|none|
|» newPassword|body|string|false|none|

<h3 id="change-passsword-only-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|Success|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad password|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## Get list of users.

`GET /users`

<h3 id="get-list-of-users.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|number|false|user id|
|username|query|string|false|username|
|role|query|string|false|user role|
|limit|query|number|false|Number of query user|
|start|query|integer|false|Starting row offset|
|order|query|string|false|asc or desc|
|orderBy|query|string|false|Order by value|

#### Enumerated Values

|Parameter|Value|
|---|---|
|role|admin|
|order|asc|
|order|desc|
|orderBy|username|
|orderBy|role|
|orderBy|createdAt|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "total": {
      "type": "number",
      "description": "Total user match",
      "example": 10
    },
    "limit": {
      "type": "number",
      "description": "Number of query user"
    },
    "start": {
      "type": "number",
      "description": "Starting row offset"
    },
    "users": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "example": "root"
          },
          "role": {
            "type": "string",
            "enum": [
              "admin"
            ],
            "example": "admin"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      }
    }
  }
}
```

<h3 id="get-list-of-users.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Error|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<h3 id="get-list-of-users.-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» total|number|false|none|Total user match|
|» limit|number|false|none|Number of query user|
|» start|number|false|none|Starting row offset|
|» users|[[UserDetail](#schemauserdetail)]|false|none|none|
|»» username|string|false|none|none|
|»» role|string|false|none|none|
|»» createdAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|role|admin|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="core-api-logger">Logger</h1>

## Tracing logs

<a id="opIdtraceLog"></a>

`GET /logger`

Query old log

<h3 id="tracing-logs-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|from|query|string(date-time)|false|Start time for the search|
|until|query|string(date-time)|false|End time for the search|
|limit|query|integer|false|Number of query message|
|start|query|integer|false|Starting row offset|
|order|query|string|false|asc or desc|

#### Enumerated Values

|Parameter|Value|
|---|---|
|order|asc|
|order|desc|

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "rows": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "level": {
              "type": "string",
              "enum": [
                "info",
                "warn",
                "error"
              ]
            },
            "message": {
              "type": "string",
              "example": "Hello World"
            },
            "timestamp": {
              "type": "string",
              "format": "date-time"
            }
          }
        }
      }
    }
  }
}
```

<h3 id="tracing-logs-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Logs](#schemalogs)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Error|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<h3 id="tracing-logs-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» errors|[string]|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="core-api-health-check">Health Check</h1>

## Get system info

<a id="opIdhealthCheck"></a>

`GET /healthcheck`

Get system info

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "ip": {
      "type": "string",
      "format": "ipv4",
      "example": "192.168.1.1"
    },
    "hostname": {
      "type": "string",
      "example": "DESKTOP-TI5UK3V"
    },
    "platform": {
      "type": "string",
      "example": "linux"
    },
    "os": {
      "type": "string",
      "example": "Ubuntu 22.04"
    },
    "type": {
      "type": "string",
      "example": "Linux"
    },
    "arch": {
      "type": "string",
      "example": "x64"
    },
    "cpuCount": {
      "type": "number",
      "example": 8
    },
    "cpuModel": {
      "type": "string",
      "example": "Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz"
    }
  }
}
```

<h3 id="get-system-info-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<h3 id="get-system-info-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» ip|string(ipv4)|false|none|none|
|» hostname|string|false|none|none|
|» platform|string|false|none|none|
|» os|string|false|none|none|
|» type|string|false|none|none|
|» arch|string|false|none|none|
|» cpuCount|number|false|none|none|
|» cpuModel|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

# Schemas

<h2 id="tocS_Logs">Logs</h2>
 <a id="schemalogs"></a>
<a id="schema_Logs"></a>
<a id="tocSlogs"></a>
<a id="tocslogs"></a>

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "rows": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "level": {
              "type": "string",
              "enum": [
                "info",
                "warn",
                "error"
              ]
            },
            "message": {
              "type": "string",
              "example": "Hello World"
            },
            "timestamp": {
              "type": "string",
              "format": "date-time"
            }
          }
        }
      }
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|rows|[object]|false|none|none|
|» level|string|false|none|none|
|» message|string|false|none|none|
|» timestamp|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|level|info|
|level|warn|
|level|error|

<h2 id="tocS_User">User</h2>
 <a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "example": "admin"
    },
    "password": {
      "type": "string",
      "example": "admin"
    },
    "role": {
      "type": "string",
      "example": "admin"
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|username|string|false|none|none|
|password|string|false|none|none|
|role|string|false|none|none|

<h2 id="tocS_UserDetail">UserDetail</h2>
 <a id="schemauserdetail"></a>
<a id="schema_UserDetail"></a>
<a id="tocSuserdetail"></a>
<a id="tocsuserdetail"></a>

```json
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "example": "root"
    },
    "role": {
      "type": "string",
      "enum": [
        "admin"
      ],
      "example": "admin"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|username|string|false|none|none|
|role|string|false|none|none|
|createdAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|role|admin|

<h2 id="tocS_DynamicProps">DynamicProps</h2>
 <a id="schemadynamicprops"></a>
<a id="schema_DynamicProps"></a>
<a id="tocSdynamicprops"></a>
<a id="tocsdynamicprops"></a>

```json
{
  "additionalProperties": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "INTEGER",
          "STRING",
          "BOOLEAN",
          "REAL",
          "DECIMAL",
          "DATES",
          "BLOBS",
          "ENUM"
        ]
      },
      "defaultValue": {
        "type": "string"
      },
      "values": {
        "type": "array"
      },
      "unique": {
        "type": "string"
      },
      "allowNull": {
        "type": "boolean"
      },
      "label": {
        "type": "string"
      },
      "placeholder": {
        "type": "string"
      }
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|**additionalProperties**|object|false|none|none|
|» type|string|false|none|none|
|» defaultValue|string|false|none|none|
|» values|array|false|none|none|
|» unique|string|false|none|none|
|» allowNull|boolean|false|none|none|
|» label|string|false|none|none|
|» placeholder|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|INTEGER|
|type|STRING|
|type|BOOLEAN|
|type|REAL|
|type|DECIMAL|
|type|DATES|
|type|BLOBS|
|type|ENUM|

<h2 id="tocS_SouthBoundPlugin">SouthBoundPlugin</h2>
 <a id="schemasouthboundplugin"></a>
<a id="schema_SouthBoundPlugin"></a>
<a id="tocSsouthboundplugin"></a>
<a id="tocssouthboundplugin"></a>

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "example": "random"
    },
    "channels": {
      "additionalProperties": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "INTEGER",
              "STRING",
              "BOOLEAN",
              "REAL",
              "DECIMAL",
              "DATES",
              "BLOBS",
              "ENUM"
            ]
          },
          "defaultValue": {
            "type": "string"
          },
          "values": {
            "type": "array"
          },
          "unique": {
            "type": "string"
          },
          "allowNull": {
            "type": "boolean"
          },
          "label": {
            "type": "string"
          },
          "placeholder": {
            "type": "string"
          }
        }
      }
    },
    "protocols": {
      "additionalProperties": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "INTEGER",
              "STRING",
              "BOOLEAN",
              "REAL",
              "DECIMAL",
              "DATES",
              "BLOBS",
              "ENUM"
            ]
          },
          "defaultValue": {
            "type": "string"
          },
          "values": {
            "type": "array"
          },
          "unique": {
            "type": "string"
          },
          "allowNull": {
            "type": "boolean"
          },
          "label": {
            "type": "string"
          },
          "placeholder": {
            "type": "string"
          }
        }
      }
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|channels|[DynamicProps](#schemadynamicprops)|false|none|none|
|protocols|[DynamicProps](#schemadynamicprops)|false|none|none|

<h2 id="tocS_Random">Random</h2>
 <a id="schemarandom"></a>
<a id="schema_Random"></a>
<a id="tocSrandom"></a>
<a id="tocsrandom"></a>

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "default": "random"
    },
    "channels": {
      "type": "object",
      "properties": {
        "max": {
          "type": "string",
          "default": "REAL"
        },
        "min": {
          "type": "string",
          "default": "REAL"
        }
      }
    },
    "protocols": {
      "type": "object",
      "properties": {
        "seed": {
          "type": "string",
          "default": "REAL"
        }
      }
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|channels|object|false|none|none|
|» max|string|false|none|none|
|» min|string|false|none|none|
|protocols|object|false|none|none|
|» seed|string|false|none|none|

<h2 id="tocS_Device">Device</h2>
 <a id="schemadevice"></a>
<a id="schema_Device"></a>
<a id="tocSdevice"></a>
<a id="tocsdevice"></a>

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "number",
      "example": 1
    },
    "name": {
      "type": "string",
      "example": "Device 1"
    },
    "modelName": {
      "type": "string",
      "example": "Model 1"
    },
    "manufacturer": {
      "type": "string",
      "example": "Back Khoa"
    },
    "type": {
      "type": "string",
      "example": "Power Meter"
    },
    "status": {
      "type": "string",
      "enum": [
        "dormant",
        "active"
      ]
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updateAt": {
      "type": "string",
      "format": "date-time"
    },
    "upProtocol": {
      "type": "object"
    },
    "downProtocol": {
      "type": "object"
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|number|false|none|none|
|name|string|false|none|none|
|modelName|string|false|none|none|
|manufacturer|string|false|none|none|
|type|string|false|none|none|
|status|string|false|none|none|
|createdAt|string(date-time)|false|none|none|
|updateAt|string(date-time)|false|none|none|
|upProtocol|object|false|none|none|
|downProtocol|object|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|dormant|
|status|active|


