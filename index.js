var Steam = require( 'steam' );
var steamClient = new Steam.SteamClient();
var steamUser = new Steam.SteamUser( steamClient );
var steamFriends = new Steam.SteamFriends( steamClient );
var fs = require('fs');
 
steamClient.connect();
steamClient.on( 'connected', () =>
{
 
	steamUser.logOn(
	{
		account_name: 'accountname',
		password: 'password',
		two_factor_code: 'current_2fa_code_from_app',
	} );
} );
 
steamClient.on( 'logOnResponse', ( logonResp ) => {
	if ( logonResp.eresult == Steam.EResult.OK ) {
		
		steamFriends.setPersonaState( Steam.EPersonaState.Online ); // if you want to be online too, but not actually necessary
        console.log('Idleing games..');
		steamUser.gamesPlayed( {
			games_played: [
				{ game_id: '730' }, // csgo
				{ game_id: '500' } // l4d2
				// etc.. up to ~30 games
			]
		} );
	}
});
 
steamClient.on( "error", ( error ) =>
{
	console.log( "err:", error );
} );