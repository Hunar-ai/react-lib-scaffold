import React from 'react';

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import ClearIcon from '@mui/icons-material/Clear';
import Divider from '@mui/material/Divider';

import { PastComments } from './PastComments';

import { TextArea } from 'components/common';

import { type CommentProps, ReactElement } from 'interfaces';
import { SettingsContext } from 'contexts';
import { useGaHelper } from 'hooks';

interface CommentPopOverProps {
    onSaveCommentClick: VoidFunction;
    commentText: string;
    setCommentText: (_: string) => void;
    commentIcon: ReactElement;
    commentList: CommentProps[];
    openCommentPopOver: boolean;
    setOpenCommentPopOver: (_: boolean) => void;
    setRefetchData?: (_: boolean) => void;
    commentMaxLength?: number;
    commentMinLength?: number;
    btnSize?: 'small';
}

export const CommentPopOver = ({
    onSaveCommentClick,
    commentText,
    setCommentText,
    commentIcon,
    commentList,
    openCommentPopOver,
    setOpenCommentPopOver,
    setRefetchData,
    commentMaxLength = 1000,
    commentMinLength = 5,
    btnSize = 'small'
}: CommentPopOverProps) => {
    const { loggedInPersonnel } = React.useContext(SettingsContext);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const { captureGaEvent, commentGaEvent } = useGaHelper();

    const [expanded, setExpanded] = React.useState<boolean>(true);

    const onCommentIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        captureGaEvent(commentGaEvent.popoverOpenEvent);
        setAnchorEl(event.currentTarget);
        setOpenCommentPopOver(true);
    };

    const onChange = (e: React.BaseSyntheticEvent) => {
        setCommentText(e.target.value);
    };

    const toggleAddCommentSection = () => {
        captureGaEvent(
            expanded
                ? commentGaEvent.textAreaCollapseEvent
                : commentGaEvent.textAreaExpandEvent
        );
        setExpanded(!expanded);
    };

    const handleClose = () => {
        captureGaEvent(commentGaEvent.popoverCloseEvent);
        setCommentText('');
        setAnchorEl(null);
        setOpenCommentPopOver(false);
        setRefetchData?.(true);
    };
    React.useEffect(() => {
        if (commentList?.length === 0) {
            setExpanded(true);
        }
    }, [commentList]);

    return (
        <>
            <IconButton onClick={onCommentIconClick} size={btnSize}>
                {commentIcon}
            </IconButton>
            <Popover
                anchorEl={anchorEl}
                open={openCommentPopOver}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <Grid container id="popover" width={322} p={2} maxHeight={419}>
                    <Grid container alignItems="center" pb={1}>
                        <Grid item flexGrow={1}>
                            <Typography variant="subtitle2">
                                {loggedInPersonnel?.fullName}
                            </Typography>
                        </Grid>
                        {commentList.length > 0 ? (
                            <Grid item>
                                <IconButton
                                    onClick={toggleAddCommentSection}
                                    size="small"
                                >
                                    {expanded ? (
                                        <ExpandLessIcon fontSize="small" />
                                    ) : (
                                        <ExpandMoreIcon fontSize="small" />
                                    )}
                                </IconButton>
                            </Grid>
                        ) : null}
                        {!expanded && (
                            <Grid item>
                                <IconButton onClick={handleClose} size="small">
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                    <Grid container rowSpacing={2}>
                        <Grid item md={12} id="add-comment">
                            <Collapse in={expanded} timeout={10}>
                                <TextArea
                                    showCharHelpText
                                    minLength={commentMinLength}
                                    maxLength={commentMaxLength}
                                    name="add"
                                    placeholder="Add Comment"
                                    onChange={onChange}
                                    value={commentText}
                                    maxRows={2}
                                    resize="none"
                                />

                                <Grid
                                    display="flex"
                                    justifyContent="flex-end"
                                    columnGap={2}
                                    mt={2}
                                >
                                    <Button
                                        variant="outlined"
                                        onClick={handleClose}
                                        size="small"
                                    >
                                        CANCEL
                                    </Button>

                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            captureGaEvent(
                                                commentGaEvent.textAreaSubmitEvent
                                            );
                                            onSaveCommentClick();
                                        }}
                                        disabled={
                                            commentText.trim().length === 0 ||
                                            commentText.length <
                                                commentMinLength ||
                                            commentText.length >
                                                commentMaxLength
                                        }
                                        size="small"
                                    >
                                        SAVE
                                    </Button>
                                </Grid>
                            </Collapse>
                        </Grid>
                        {commentList?.length > 0 && (
                            <>
                                <Grid item md={12}>
                                    <Divider />
                                </Grid>
                                <Grid item md={12}>
                                    <PastComments
                                        data={commentList}
                                        expanded={expanded}
                                        isPopover
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Popover>
        </>
    );
};
