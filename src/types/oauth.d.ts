// OAuth Type Declarations for Google and Apple

declare global {
    interface Window {
        google?: {
            accounts: {
                oauth2?: {
                    initTokenClient: (config: {
                        client_id: string;
                        scope: string;
                        callback: (response: { access_token: string }) => void;
                    }) => {
                        requestAccessToken: () => void;
                    };
                    hasGrantedAllScopes: (tokenResponse: any, ...scopes: string[]) => boolean;
                };
                id: {
                    initialize: (config: {
                        client_id: string;
                        callback: (response: { credential: string }) => void;
                    }) => void;
                    renderButton: (element: HTMLElement, config: any) => void;
                    prompt: () => void;
                };
            };
        };
        AppleID?: {
            auth: {
                init: (config: {
                    clientId: string;
                    scope: string;
                    redirectURI: string;
                    usePopup: boolean;
                }) => void;
                signIn: () => Promise<{
                    authorization: {
                        id_token: string;
                        code: string;
                    };
                    user?: {
                        email?: string;
                        name?: {
                            firstName?: string;
                            lastName?: string;
                        };
                    };
                }>;
            };
        };
    }
}

export {};

