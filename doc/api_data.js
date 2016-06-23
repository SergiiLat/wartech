define({ "api": [
  {
    "type": "post",
    "url": "/api/login",
    "title": "Authentication",
    "name": "Login",
    "group": "Basic",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email пользователя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Пароль</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token for User.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The pair email and password was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./route.js",
    "groupTitle": "Basic"
  },
  {
    "type": "get",
    "url": "/api/logout",
    "title": "Logout",
    "name": "Logout",
    "group": "Basic",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>ok</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./route.js",
    "groupTitle": "Basic"
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "Registration",
    "name": "Registration",
    "group": "Basic",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Имя пользователя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email пользователя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Пароль</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token for User.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmailError",
            "description": "<p>Bad request email isn't specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordError",
            "description": "<p>Bad request password isn't specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmailDublicateError",
            "description": "<p>Bad request email is used.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./route.js",
    "groupTitle": "Basic"
  },
  {
    "type": "get",
    "url": "/api/profile",
    "title": "GetDetailInfo",
    "name": "UserDetail",
    "group": "Basic",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This optional description belong to authenticate user.</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>User profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "User.id",
            "description": "<p>Users id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.name",
            "description": "<p>Users name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.password",
            "description": "<p>Users password.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "User.createdAt",
            "description": "<p>Users createdAt.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "User.updatedAt",
            "description": "<p>Users updatedAt.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The pair email and password was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./route.js",
    "groupTitle": "Basic"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "H__node_work_wartech_doc_main_js",
    "groupTitle": "H__node_work_wartech_doc_main_js",
    "name": ""
  }
] });
