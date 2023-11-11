const DiscordStrategy = require('passport-discord').Strategy
const passport = require('passport')

passport.use(
    'discord',
    new DiscordStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SEC,
            callbackURL: process.env.CLIENT_REDIRECT,
            scope: ['identify']
        },
        async (accessToken, refreshToken, profile, cp) => {
            await profile
            console.log('Callback function called')
            console.log(profile.username)
            console.log(profile.id)
            // cp(null, profile) //Mention
        }
    )
)

// async () => {
//   const fragment = new URLSearchParams(window.location.hash.slice(1))
//   const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')]
//   //console.log('outside',token)
//   if (user === null && accessToken !== null && wallet) {
//       //console.log('inside')

//       //console.log('accesstoken & tokenTpe',accessToken,tokenType)

//       fetch('https://discord.com/api/users/@me', {
//           headers: {
//               authorization: `${tokenType} ${accessToken}`
//           }
//       })
//           .then((result) => result.json())
//           .then((response) => {
//               //signBytes();
//               //console.log("test is connected",txResult, txError, verifyResult);
//               console.log('RESPONSE https://discord.com/api/users/@me', response)

//               const { adress, type } = wallet
//               const { username, discriminator, id, avatar } = response
//               console.log('wallet', wallet)
//               console.log('response', response)
//           })
//   }
// }

//
// //Mention
// passport.serializeUser((user, done) => {
//     done(null, user);
//   });

//   passport.deserializeUser((obj, done) => {
//     done(null, obj);
//   });
