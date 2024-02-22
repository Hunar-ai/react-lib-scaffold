import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RoutesContainer from './routes';
import { Interpolation, Theme } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import grey from '@mui/material/colors/grey';
import red from '@mui/material/colors/red';

import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
import './config';

export const asteriskStyle = {
    color: red[600],
    fontSize: '20px',
    fontFamily: 'Roboto,Arial,sans-serif'
};

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Lato',
            textTransform: 'none'
        }
    },
    palette: {
        text: {
            primary: grey[900]
        }
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                sizeSmall: {
                    fontSize: '0.85rem',
                    minHeight: '2.2rem !important'
                },
                inputSizeSmall: {
                    height: '0.9rem !important'
                }
            }
        },

        MuiInputLabel: {
            styleOverrides: {
                sizeSmall: {
                    fontSize: '0.85rem'
                },
                asterisk: asteriskStyle
            }
        },
        MuiButton: {
            styleOverrides: {
                sizeMedium: {
                    height: '2.0.85rem'
                },
                sizeSmall: {
                    height: '1.8rem'
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    // fontSize: '0.85rem',
                    // minHeight: '1.138rem'
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                asterisk: asteriskStyle
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                asterisk: asteriskStyle
            }
        }
    }
});

const globalStyles: Interpolation<Theme> = {
    // '::-webkit-scrollbar': {
    //     width: '8px',
    //     height: '8px'
    // },
    // '::-webkit-scrollbar-track': {
    //     backgroundColor: 'transparent'
    // },
    // '::-webkit-scrollbar-thumb': {
    //     borderRadius: 4,
    //     backgroundColor: theme.palette.grey[500]
    // },
    // '::-webkit-scrollbar-thumb:hover': {
    //     backgroundColor: theme.palette.grey[600]
    // }
};

declare global {
    interface Window {
        dataLayer: any;
        difflib: any;
        gaAppId: string;
        gtag: any;
    }
}

const queryClient = new QueryClient();

const App = () => {
    React.useEffect(() => {
        if (window && document) {
            const script = document.createElement('script');
            const body = document.getElementsByTagName('body')[0];
            script.src =
                'https://storage.googleapis.com/public_bocket/difflib-browser.js';
            body.appendChild(script);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={globalStyles} />
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <RoutesContainer />
                <ToastContainer />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
