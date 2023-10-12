import requests

headers = {
    'Accept': 'application/vnd.github+json',
    'Authorization': 'Bearer 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',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/x-www-form-urlencoded',
}

data = '{"name":"heroku_node_test","description":"Initial Repo Commit","homepage":"https://github.com","private":true,"is_template":true}'

response = requests.post('https://api.github.com/user/repos', headers=headers, data=data)