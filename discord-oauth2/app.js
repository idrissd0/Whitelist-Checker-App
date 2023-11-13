const express = require('express')
const axios = require('axios')
require('dotenv').config()

const PORT = 3020
const app = express()

app.get('/', (req, res) => {
    res.send(`
        <div style="margin: 300px auto;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: sans-serif;"
        >
            <h3>Welcome to Discord OAuth NodeJS App</h3>
            <p>Click on the below button to get started!</p>
            <a
                href="https://discord.com/api/oauth2/authorize?client_id=1172086920940093450&redirect_uri=http%3A%2F%2Flocalhost%3A3020%2Fauth%2Fdiscord&response_type=code&scope=identify"
                style="
                    outline: none;
                    padding: 10px;
                    border: none;
                    font-size: 20px;
                    margin-top: 20px;
                    border-radius: 8px;
                    background: #6D81CD;
                    cursor:pointer;
                    text-decoration: none;
                    color: white;
                "
            >
            Login with Discord</a>
        </div>
    `)
})

app.get('/auth/discord', async (req, res) => {
    const code = req.query.code
    const params = new URLSearchParams()
    let user
    params.append('client_id', '1172086920940093450')
    params.append('client_secret', '62lD33OmKSDG_O1PDYKL6p_IwYOMENoZ')
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', 'http://localhost:3020/auth/discord')
    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', params)
        const { access_token, token_type } = response.data
        const userDataResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${token_type} ${access_token}`
            }
        })
        console.log('Data: ', userDataResponse.data)
        user = {
            username: userDataResponse.data.username,
            userid: userDataResponse.data.id,
            icon: userDataResponse.data.avatar,
            // email: userDataResponse.data.email,
            avatar: `https://cdn.discordapp.com/avatars/${userDataResponse.data.id}/${userDataResponse.data.avatar}.png`
        }
        return res.send(`
            <div style="margin: 300px auto;
            max-width: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: sans-serif;"
            >
                <h3>Welcome ${user.username}</h3>
                <h5>user Id: ${user.userid}</h5>
                
                <img src="${user.avatar}"/>
            </div>
        `)
    } catch (error) {
        console.log('Error', error)
        return res.send('Some error occurred! ')
    }
})

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})
