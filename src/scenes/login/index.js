import * as React from 'react';
import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { Button } from 'react-native';

import appsettings from '../../../appsettings.json';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    // Endpoint
    const discovery = useAutoDiscovery(`${appsettings.AzureAd.Instance}/${appsettings.AzureAd.TenantId}/v2.0`);

    // Request
    const [request, response, promptAsync] = useAuthRequest(
        {
        clientId: appsettings.AzureAd.ClientId,
        scopes: ['openid', 'profile', 'email', 'offline_access'],
        redirectUri: makeRedirectUri(),
        },
        discovery
    );

    useEffect(() => {
        console.log(makeRedirectUri());
    }, [response])

    return (
        <Button
        disabled={!request}
        title="Login"
        onPress={() => {
            promptAsync();
        }}
        />
    );
}

export default LoginScreen;