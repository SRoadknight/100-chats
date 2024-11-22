import { supabase } from './supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Account from './Account'
import { useAuth } from './AuthProvider'


const MainComponent = () => {
    const { session } = useAuth();
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');

	if (error) {
		// Display a friendly message to the user
		console.error('OAuth error:', errorDescription);
		alert('Something went wrong during the login process. Please try again.');
	  }

    return (
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa.dark }}
            providers={['discord']}
            onlyThirdPartyProviders
          />
        ) : (
          <Account />
        )}
      </div>
    );
  };

  export default MainComponent;