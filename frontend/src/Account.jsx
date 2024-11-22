import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthProvider';
import SignOut  from './SignOut';

const Account = () => {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [discordHandle, setDiscordHandle] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');


  useEffect(() => {
      async function getProfile() {
        console.log("get profile");
        setLoading(true);
        const { user } = session;

        let { data, error } = await supabase
          .from('profiles')
          .select(`discord_handle, avatar_url`)
          .eq('user_id', user.id)
          .single();

        // insert a random user to test insert ability
        // let { newData, newError } = await supabase
        //   .from('profiles')
        //   .insert([{ discord_handle: 'test', avatar_url: 'test' }]);


        if (error) {
          console.warn(error);
        } else if (data) {
          setDiscordHandle(data.discord_handle);
          setAvatarUrl(data.avatar_url);
        }

        setLoading(false);
      }

      if (session) {
        getProfile();
      }
    }, [session]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Account</h1>
      <p>Discord Handle: {discordHandle}</p>
      <img src={avatarUrl} alt="Avatar" />
      <SignOut />
    </div>
  );
};

export default Account;