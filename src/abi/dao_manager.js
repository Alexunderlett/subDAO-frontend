module.exports = {
    "metadataVersion": "0.1.0",
    "source": {
    "hash": "0x4f06869e9000e01035653a9e2286f416984f47e2f17f3654c2941a8ab760971f",
        "language": "ink! 3.0.0-rc2",
        "compiler": "rustc 1.50.0-nightly"
},
    "contract": {
    "name": "dao_manager",
        "version": "0.1.0",
        "authors": [
        "[your_name] <[your_email]>"
    ]
},
    "spec": {
    "constructors": [
        {
            "args": [
                {
                    "name": "controller",
                    "type": {
                        "displayName": [
                            "AccountId"
                        ],
                        "type": 2
                    }
                },
                {
                    "name": "org_id",
                    "type": {
                        "displayName": [
                            "u64"
                        ],
                        "type": 5
                    }
                }
            ],
            "docs": [
                " Constructor that initializes the `bool` value to the given `init_value`."
            ],
            "name": [
                "new"
            ],
            "selector": "0xd183512b"
        }
    ],
        "docs": [],
        "events": [
        {
            "args": [
                {
                    "docs": [],
                    "indexed": true,
                    "name": "dao_addr",
                    "type": {
                        "displayName": [
                            "AccountId"
                        ],
                        "type": 2
                    }
                },
                {
                    "docs": [],
                    "indexed": true,
                    "name": "component_type",
                    "type": {
                        "displayName": [
                            "ComponentType"
                        ],
                        "type": 10
                    }
                },
                {
                    "docs": [],
                    "indexed": true,
                    "name": "component_addr",
                    "type": {
                        "displayName": [
                            "AccountId"
                        ],
                        "type": 2
                    }
                }
            ],
            "docs": [],
            "name": "InstanceComponent"
        }
    ],
        "messages": [
        {
            "args": [
                {
                    "name": "base_code_hash",
                    "type": {
                        "displayName": [
                            "Hash"
                        ],
                        "type": 6
                    }
                },
                {
                    "name": "erc20_code_hash",
                    "type": {
                        "displayName": [
                            "Hash"
                        ],
                        "type": 6
                    }
                },
                {
                    "name": "erc20_name",
                    "type": {
                        "displayName": [
                            "String"
                        ],
                        "type": 7
                    }
                },
                {
                    "name": "erc20_symbol",
                    "type": {
                        "displayName": [
                            "String"
                        ],
                        "type": 7
                    }
                },
                {
                    "name": "erc20_initial_supply",
                    "type": {
                        "displayName": [
                            "u64"
                        ],
                        "type": 5
                    }
                },
                {
                    "name": "erc20_decimals",
                    "type": {
                        "displayName": [
                            "u8"
                        ],
                        "type": 4
                    }
                },
                {
                    "name": "org_code_hash",
                    "type": {
                        "displayName": [
                            "Hash"
                        ],
                        "type": 6
                    }
                },
                {
                    "name": "vault_code_hash",
                    "type": {
                        "displayName": [
                            "Hash"
                        ],
                        "type": 6
                    }
                },
                {
                    "name": "vote_code_hash",
                    "type": {
                        "displayName": [
                            "Hash"
                        ],
                        "type": 6
                    }
                },
                {
                    "name": "vote_time",
                    "type": {
                        "displayName": [
                            "u64"
                        ],
                        "type": 5
                    }
                },
                {
                    "name": "vote_support_require_pct",
                    "type": {
                        "displayName": [
                            "u64"
                        ],
                        "type": 5
                    }
                },
                {
                    "name": "vote_min_require_num",
                    "type": {
                        "displayName": [
                            "u64"
                        ],
                        "type": 5
                    }
                },
                {
                    "name": "github_code_hash",
                    "type": {
                        "displayName": [
                            "Hash"
                        ],
                        "type": 6
                    }
                }
            ],
            "docs": [],
            "mutates": true,
            "name": [
                "init"
            ],
            "payable": false,
            "returnType": {
                "displayName": [
                    "bool"
                ],
                "type": 1
            },
            "selector": "0xa1ec5918"
        },
        {
            "args": [],
            "docs": [],
            "mutates": false,
            "name": [
                "query_component_addrs"
            ],
            "payable": false,
            "returnType": {
                "displayName": [
                    "DAOComponentAddrs"
                ],
                "type": 8
            },
            "selector": "0x0db17698"
        },
        {
            "args": [
                {
                    "name": "to",
                    "type": {
                        "displayName": [
                            "AccountId"
                        ],
                        "type": 2
                    }
                },
                {
                    "name": "value",
                    "type": {
                        "displayName": [
                            "u64"
                        ],
                        "type": 5
                    }
                }
            ],
            "docs": [],
            "mutates": true,
            "name": [
                "transfer"
            ],
            "payable": false,
            "returnType": {
                "displayName": [
                    "bool"
                ],
                "type": 1
            },
            "selector": "0xfae3a09d"
        },
        {
            "args": [
                {
                    "name": "to",
                    "type": {
                        "displayName": [
                            "AccountId"
                        ],
                        "type": 2
                    }
                },
                {
                    "name": "value",
                    "type": {
                        "displayName": [
                            "u64"
                        ],
                        "type": 5
                    }
                }
            ],
            "docs": [],
            "mutates": true,
            "name": [
                "mint_token_by_owner"
            ],
            "payable": false,
            "returnType": {
                "displayName": [
                    "bool"
                ],
                "type": 1
            },
            "selector": "0x66612e04"
        },
        {
            "args": [
                {
                    "name": "from",
                    "type": {
                        "displayName": [
                            "AccountId"
                        ],
                        "type": 2
                    }
                },
                {
                    "name": "value",
                    "type": {
                        "displayName": [
                            "u64"
                        ],
                        "type": 5
                    }
                }
            ],
            "docs": [],
            "mutates": true,
            "name": [
                "destroy_token_by_owner"
            ],
            "payable": false,
            "returnType": {
                "displayName": [
                    "bool"
                ],
                "type": 1
            },
            "selector": "0x8b31777e"
        },
        {
            "args": [
                {
                    "name": "name",
                    "type": {
                        "displayName": [
                            "String"
                        ],
                        "type": 7
                    }
                },
                {
                    "name": "moderator",
                    "type": {
                        "displayName": [
                            "AccountId"
                        ],
                        "type": 2
                    }
                }
            ],
            "docs": [],
            "mutates": true,
            "name": [
                "add_dao_moderator"
            ],
            "payable": false,
            "returnType": {
                "displayName": [
                    "bool"
                ],
                "type": 1
            },
            "selector": "0x75b5bf28"
        },
        {
            "args": [
                {
                    "name": "member",
                    "type": {
                        "displayName": [
                            "AccountId"
                        ],
                        "type": 2
                    }
                }
            ],
            "docs": [],
            "mutates": true,
            "name": [
                "remove_dao_moderator"
            ],
            "payable": false,
            "returnType": {
                "displayName": [
                    "bool"
                ],
                "type": 1
            },
            "selector": "0xf555353e"
        }
    ]
},
    "storage": {
    "struct": {
        "fields": [
            {
                "layout": {
                    "cell": {
                        "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                        "ty": 1
                    }
                },
                "name": "init"
            },
            {
                "layout": {
                    "cell": {
                        "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                        "ty": 2
                    }
                },
                "name": "controller"
            },
            {
                "layout": {
                    "cell": {
                        "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                        "ty": 5
                    }
                },
                "name": "org_id"
            },
            {
                "layout": {
                    "struct": {
                        "fields": [
                            {
                                "layout": {
                                    "enum": {
                                        "dispatchKey": "0x0300000000000000000000000000000000000000000000000000000000000000",
                                        "variants": {
                                            "0": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "struct": {
                                                                "fields": [
                                                                    {
                                                                        "layout": {
                                                                            "cell": {
                                                                                "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                                                                                "ty": 2
                                                                            }
                                                                        },
                                                                        "name": "account_id"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        "name": null
                                                    }
                                                ]
                                            },
                                            "1": {
                                                "fields": []
                                            }
                                        }
                                    }
                                },
                                "name": "base"
                            },
                            {
                                "layout": {
                                    "enum": {
                                        "dispatchKey": "0x0400000000000000000000000000000000000000000000000000000000000000",
                                        "variants": {
                                            "0": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "struct": {
                                                                "fields": [
                                                                    {
                                                                        "layout": {
                                                                            "cell": {
                                                                                "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                                                                                "ty": 2
                                                                            }
                                                                        },
                                                                        "name": "account_id"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        "name": null
                                                    }
                                                ]
                                            },
                                            "1": {
                                                "fields": []
                                            }
                                        }
                                    }
                                },
                                "name": "erc20"
                            },
                            {
                                "layout": {
                                    "enum": {
                                        "dispatchKey": "0x0500000000000000000000000000000000000000000000000000000000000000",
                                        "variants": {
                                            "0": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "struct": {
                                                                "fields": [
                                                                    {
                                                                        "layout": {
                                                                            "cell": {
                                                                                "key": "0x0600000000000000000000000000000000000000000000000000000000000000",
                                                                                "ty": 2
                                                                            }
                                                                        },
                                                                        "name": "account_id"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        "name": null
                                                    }
                                                ]
                                            },
                                            "1": {
                                                "fields": []
                                            }
                                        }
                                    }
                                },
                                "name": "org"
                            },
                            {
                                "layout": {
                                    "enum": {
                                        "dispatchKey": "0x0600000000000000000000000000000000000000000000000000000000000000",
                                        "variants": {
                                            "0": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "struct": {
                                                                "fields": [
                                                                    {
                                                                        "layout": {
                                                                            "cell": {
                                                                                "key": "0x0700000000000000000000000000000000000000000000000000000000000000",
                                                                                "ty": 2
                                                                            }
                                                                        },
                                                                        "name": "account_id"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        "name": null
                                                    }
                                                ]
                                            },
                                            "1": {
                                                "fields": []
                                            }
                                        }
                                    }
                                },
                                "name": "vault"
                            },
                            {
                                "layout": {
                                    "enum": {
                                        "dispatchKey": "0x0700000000000000000000000000000000000000000000000000000000000000",
                                        "variants": {
                                            "0": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "struct": {
                                                                "fields": [
                                                                    {
                                                                        "layout": {
                                                                            "cell": {
                                                                                "key": "0x0800000000000000000000000000000000000000000000000000000000000000",
                                                                                "ty": 2
                                                                            }
                                                                        },
                                                                        "name": "account_id"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        "name": null
                                                    }
                                                ]
                                            },
                                            "1": {
                                                "fields": []
                                            }
                                        }
                                    }
                                },
                                "name": "vote"
                            },
                            {
                                "layout": {
                                    "enum": {
                                        "dispatchKey": "0x0800000000000000000000000000000000000000000000000000000000000000",
                                        "variants": {
                                            "0": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "struct": {
                                                                "fields": [
                                                                    {
                                                                        "layout": {
                                                                            "cell": {
                                                                                "key": "0x0900000000000000000000000000000000000000000000000000000000000000",
                                                                                "ty": 2
                                                                            }
                                                                        },
                                                                        "name": "account_id"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        "name": null
                                                    }
                                                ]
                                            },
                                            "1": {
                                                "fields": []
                                            }
                                        }
                                    }
                                },
                                "name": "github"
                            }
                        ]
                    }
                },
                "name": "components"
            },
            {
                "layout": {
                    "struct": {
                        "fields": [
                            {
                                "layout": {
                                    "enum": {
                                        "dispatchKey": "0x0900000000000000000000000000000000000000000000000000000000000000",
                                        "variants": {
                                            "0": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "cell": {
                                                                "key": "0x0a00000000000000000000000000000000000000000000000000000000000000",
                                                                "ty": 2
                                                            }
                                                        },
                                                        "name": null
                                                    }
                                                ]
                                            },
                                            "1": {
                                                "fields": []
                                            }
                                        }
                                    }
                                },
                                "name": "base_addr"
                            },
                            {
                                "layout": {
                                    "enum": {
                                        "dispatchKey": "0x0a00000000000000000000000000000000000000000000000000000000000000",
                                        "variants": {
                                            "0": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "cell": {
                                                                "key": "0x0b00000000000000000000000000000000000000000000000000000000000000",
                                                                "ty": 2
                                                            }
                                                        },
                                                        "name": null
                                                    }
                                                ]
                                            },
                                            "1": {
                                                "fields": []
                                            }
                                        }
                                    }
                                },
                                "name": "erc20_addr"
                            },
                            {
                                "layout": {
                                    "enum": {
                                        "dispatchKey": "0x0b00000000000000000000000000000000000000000000000000000000000000",
                                        "variants": {
                                            "0": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "cell": {
                                                                "key": "0x0c00000000000000000000000000000000000000000000000000000000000000",
                                                                "ty": 2
                                                            }
                                                        },
                                                        "name": null
                                                    }
                                                ]
                                            },
                                            "1": {
                                                "fields": []
                                            }
                                        }
                                    }
                                },
                                "name": "org_addr"
                            },
                            {
                                "layout": {
                                    "enum": {
                                        "dispatchKey": "0x0c00000000000000000000000000000000000000000000000000000000000000",
                                        "variants": {
                                            "0": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "cell": {
                                                                "key": "0x0d00000000000000000000000000000000000000000000000000000000000000",
                                                                "ty": 2
                                                            }
                                                        },
                                                        "name": null
                                                    }
                                                ]
                                            },
                                            "1": {
                                                "fields": []
                                            }
                                        }
                                    }
                                },
                                "name": "vault_addr"
                            },
                            {
                                "layout": {
                                    "enum": {
                                        "dispatchKey": "0x0d00000000000000000000000000000000000000000000000000000000000000",
                                        "variants": {
                                            "0": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "cell": {
                                                                "key": "0x0e00000000000000000000000000000000000000000000000000000000000000",
                                                                "ty": 2
                                                            }
                                                        },
                                                        "name": null
                                                    }
                                                ]
                                            },
                                            "1": {
                                                "fields": []
                                            }
                                        }
                                    }
                                },
                                "name": "vote_addr"
                            },
                            {
                                "layout": {
                                    "enum": {
                                        "dispatchKey": "0x0e00000000000000000000000000000000000000000000000000000000000000",
                                        "variants": {
                                            "0": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "cell": {
                                                                "key": "0x0f00000000000000000000000000000000000000000000000000000000000000",
                                                                "ty": 2
                                                            }
                                                        },
                                                        "name": null
                                                    }
                                                ]
                                            },
                                            "1": {
                                                "fields": []
                                            }
                                        }
                                    }
                                },
                                "name": "github_addr"
                            }
                        ]
                    }
                },
                "name": "component_addrs"
            }
        ]
    }
},
    "types": [
    {
        "def": {
            "primitive": "bool"
        }
    },
    {
        "def": {
            "composite": {
                "fields": [
                    {
                        "type": 3
                    }
                ]
            }
        },
        "path": [
            "ink_env",
            "types",
            "AccountId"
        ]
    },
    {
        "def": {
            "array": {
                "len": 32,
                "type": 4
            }
        }
    },
    {
        "def": {
            "primitive": "u8"
        }
    },
    {
        "def": {
            "primitive": "u64"
        }
    },
    {
        "def": {
            "composite": {
                "fields": [
                    {
                        "type": 3
                    }
                ]
            }
        },
        "path": [
            "ink_env",
            "types",
            "Hash"
        ]
    },
    {
        "def": {
            "primitive": "str"
        }
    },
    {
        "def": {
            "composite": {
                "fields": [
                    {
                        "name": "base_addr",
                        "type": 9
                    },
                    {
                        "name": "erc20_addr",
                        "type": 9
                    },
                    {
                        "name": "org_addr",
                        "type": 9
                    },
                    {
                        "name": "vault_addr",
                        "type": 9
                    },
                    {
                        "name": "vote_addr",
                        "type": 9
                    },
                    {
                        "name": "github_addr",
                        "type": 9
                    }
                ]
            }
        },
        "path": [
            "dao_manager",
            "dao_manager",
            "DAOComponentAddrs"
        ]
    },
    {
        "def": {
            "variant": {
                "variants": [
                    {
                        "name": "None"
                    },
                    {
                        "fields": [
                            {
                                "type": 2
                            }
                        ],
                        "name": "Some"
                    }
                ]
            }
        },
        "params": [
            2
        ],
        "path": [
            "Option"
        ]
    },
    {
        "def": {
            "variant": {
                "variants": [
                    {
                        "discriminant": 0,
                        "name": "Base"
                    },
                    {
                        "discriminant": 1,
                        "name": "Erc20"
                    },
                    {
                        "discriminant": 2,
                        "name": "Org"
                    },
                    {
                        "discriminant": 3,
                        "name": "Vault"
                    },
                    {
                        "discriminant": 4,
                        "name": "VoteManager"
                    },
                    {
                        "discriminant": 5,
                        "name": "Github"
                    }
                ]
            }
        },
        "path": [
            "dao_manager",
            "dao_manager",
            "ComponentType"
        ]
    }
]
}
