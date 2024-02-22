import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IconButton from '@mui/material/IconButton';

interface WhatsappIconButtonProps {
    link: string;
    size?: 'small' | 'medium' | 'large';
    iconFontSize?: 'small' | 'medium' | 'large';
}

export const WhatsappIconButton = ({
    link,
    size = 'small',
    iconFontSize = 'medium'
}: WhatsappIconButtonProps) => {
    return (
        <IconButton
            size={size}
            target="_blank"
            sx={{ color: '#25d366' }}
            href={link}
        >
            <WhatsAppIcon fontSize={iconFontSize} />
        </IconButton>
    );
};
