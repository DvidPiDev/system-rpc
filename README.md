# system-rpc
displays a simple discord RPC which has basic system stats

## preview:
![image](https://github.com/DvidPiDev/system-rpc/assets/79283415/ad024192-b49a-4062-828f-372e6b608d0f) \
(minus the buttons)

## setting up:
edit the .env file
```dotenv
DISCORD_ID="" // Discord ID of your app
```

optionally, you can also change the REFRESH to configure how often the RPC is refreshed. the time is in milliseconds

## extra info:
this was originally made for linux, and thus, support for other operating systems isnt planned
afaik it should work with other oses just fine, you may have to run this as admin on windows
- There is an issue with Windows computer that have an intel cpu, CPU temps arent showing
