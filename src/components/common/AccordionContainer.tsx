import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import type { SxProps } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ReactElement } from 'interfaces';

interface AccordionSXprops {
    accordianDetailsRoot?: SxProps;
    accordionRoot?: SxProps;
    accordianSummaryRoot?: SxProps;
}
interface AccordionContainerProps {
    title: ReactElement;
    body: ReactElement;
    expanded?: boolean;
    onChange?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
    onOpen?: (node: HTMLElement, isAppearing: boolean) => void;
    disabled?: boolean;
    elevation?: number;
    accordionSX?: SxProps;
    accordionSummarySX?: SxProps;
    accordianDetailsSX?: SxProps;
    sx?: AccordionSXprops;
    showExpandLessIcon?: boolean;
}

export const AccordionContainer = ({
    title,
    body,
    expanded,
    onChange,
    onOpen,
    disabled = false,
    elevation = 1,
    sx,
    showExpandLessIcon = false
}: AccordionContainerProps) => {
    return (
        <Accordion
            expanded={expanded}
            onChange={onChange}
            disabled={disabled}
            elevation={elevation}
            TransitionProps={{ onEntered: onOpen }}
            sx={sx?.accordionRoot}
        >
            <AccordionSummary
                expandIcon={
                    expanded ? (
                        showExpandLessIcon ? (
                            <ExpandLessIcon />
                        ) : (
                            <></>
                        )
                    ) : (
                        <ExpandMoreIcon />
                    )
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={sx?.accordianSummaryRoot}
            >
                {title}
            </AccordionSummary>
            <AccordionDetails sx={sx?.accordianDetailsRoot}>
                {body}
            </AccordionDetails>
        </Accordion>
    );
};
