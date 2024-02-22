import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DatePicker } from './DatePicker';

import type { DateFilterState } from 'interfaces';

import { DateTimeFormat, type DateTimeInputFormat, TimeUtils } from 'utils';
import { FIELD_SIZE } from 'Enum';

interface DateRangePickerProps {
    onClearFilter: VoidFunction;
    onChangeDates: (_: string, __: Date | null) => void;
    filterState: DateFilterState;
    size?: FIELD_SIZE;
    startDateSelectorLabel?: string;
    endDateSelectorLabel?: string;
    inputFormat?: DateTimeInputFormat;
}

export const DateRangePicker = ({
    onClearFilter,
    onChangeDates,
    filterState,
    size = FIELD_SIZE.medium,
    startDateSelectorLabel = 'Start Date',
    endDateSelectorLabel = 'End Date',
    inputFormat = DateTimeFormat.DATE_PICKER_FORMAT
}: DateRangePickerProps) => {
    return (
        <>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                my={2}
            >
                <Grid item>
                    <Typography variant="body2">Select Date Range</Typography>
                </Grid>
                <Grid item>
                    <Button onClick={onClearFilter}>Clear</Button>
                </Grid>
            </Grid>
            <Grid container rowSpacing={2}>
                <Grid item>
                    <DatePicker
                        label={startDateSelectorLabel}
                        inputFormat={inputFormat}
                        onChange={date =>
                            onChangeDates(
                                'startDate',
                                TimeUtils.getISTStartOfTheDay(date)
                            )
                        }
                        value={filterState?.startDate}
                        size={FIELD_SIZE[size]}
                    />
                </Grid>
                <Grid item>
                    <DatePicker
                        label={endDateSelectorLabel}
                        inputFormat={inputFormat}
                        disabled={filterState?.startDate === ''}
                        onChange={date =>
                            onChangeDates(
                                'endDate',
                                TimeUtils.getISTEndOfTheDay(date)
                            )
                        }
                        value={filterState?.endDate}
                        size={FIELD_SIZE[size]}
                        minDate={TimeUtils.add({
                            date: TimeUtils.getDateByFormat(
                                filterState?.startDate
                                    ? filterState?.startDate
                                    : '',
                                DateTimeFormat.DATE_PICKER_MIN_DATE_FORMAT
                            ),
                            period: 1,
                            unit: 'days'
                        }).toDate()}
                    />
                </Grid>
            </Grid>
        </>
    );
};
