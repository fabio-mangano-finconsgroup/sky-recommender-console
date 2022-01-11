import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import VodEventSearchForm from '../vod-event-search-form/VodEventSearchForm';
import Marginer from '../marginer/Marginer';
import DataGridTable from '../form/data-grid-table/DataGridTable';
import {
  VodRecSearchFormWrapper,
  SelectButtonWrapper,
} from './VodRecSearchForm.styled';
import { validationSchema } from './validation';
import { initialValues, columns } from './config';

const VodRecSearchForm = ({
  onSubmit,
  onSearch,
  isSearching,
  searchResult,
}) => {
  return (
    <VodRecSearchFormWrapper>
      <VodEventSearchForm onSubmit={onSearch} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Marginer direction="horizontal" margin={10} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DataGridTable
                name="selectedEvent"
                columns={columns}
                loading={isSearching}
                rows={searchResult}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectButtonWrapper>
                <Button type="submit" variant="contained" color="success">
                  Select
                </Button>
              </SelectButtonWrapper>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </VodRecSearchFormWrapper>
  );
};

VodRecSearchForm.defaultProps = {
  searchResult: [],
};

VodRecSearchForm.propTypes = {
  searchResult: PropTypes.array,
  isSearching: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default VodRecSearchForm;
