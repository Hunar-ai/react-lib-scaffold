import Typography from '@mui/material/Typography';
import { AccordionContainer } from './AccordionContainer';
import grey from '@mui/material/colors/grey';
import { ReactElement } from 'interfaces';

interface FormSectionProps {
    title: string;
    expanded: boolean;
    disabled?: boolean;
    onChange: VoidFunction;
    onOpen?: VoidFunction;
    body: ReactElement;
}

export const FormSection = ({
    title,
    expanded,
    disabled = false,
    onChange,
    onOpen,
    body
}: FormSectionProps) => {
    return (
        <AccordionContainer
            sx={{
                accordionRoot: {
                    border: `1px solid ${grey[200]}`,
                    mb: 2
                }
            }}
            title={
                <Typography variant="body2" fontWeight="700">
                    {title}
                </Typography>
            }
            expanded={expanded}
            showExpandLessIcon={true}
            elevation={0}
            onChange={onChange}
            disabled={disabled}
            body={body}
            onOpen={onOpen}
        />
    );
};
