const router = require('express').Router()

router.get('/', (req, res) => {
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
                    background: blue;
                    cursor:pointer;
                    text-decoration: none;
                    color: white;
                "
            >
            Login with Discord</a>
        </div>
    `)
})

module.exports = router
