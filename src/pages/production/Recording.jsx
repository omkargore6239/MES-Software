import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Recording = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const partDetails = {
    partNoRev: 'S21-5771_07',
    partName: 'BASE AS',
    partNumber: '2406550082',
    stage: 'Tack Welding',
    batchCode: '12224'
  };

  const mainTableData = [
    { partNo: '2406550082', revNo: 10, poNo: 'G41880', customer: 'CLIMMINS', design: 'PO_30_DESIGN', currentWC: 'JIT7A', nextWC: 'IS10748 GR.1', pdRequired: 'Yes', labTest: '', result: 'Fall' },
    { partNo: '2406550082', revNo: 20, poNo: 'G41880', customer: 'CLIMMINS', design: 'PO_40_DESIGN', currentWC: 'JIT7A', nextWC: 'IS10748 GR.1', pdRequired: 'Yes', labTest: '', result: 'Pass' },
    { partNo: '2406550082', revNo: 30, poNo: 'G41880', customer: 'CLIMMINS', design: 'PO_50_DESIGN', currentWC: 'JIT7A', nextWC: 'IS10748 GR.1', pdRequired: 'Yes', labTest: '', result: 'Fall' },
    { partNo: '2406550082', revNo: 40, poNo: 'G41880', customer: 'CLIMMINS', design: 'PO_60_DESIGN', currentWC: 'JIT7A', nextWC: 'IS10748 GR.1', pdRequired: 'Yes', labTest: '', result: 'Pass' },
  ];

  const complaintData = [
    { spec: '2406550082', method: 'G41880/205', actual: 'G41880', remark: '2.5', customer: 'Hind Indicator Pvt Ltd.' },
    { spec: '2406550082', method: 'G41880/205', actual: 'G41880', remark: '2.5', customer: 'Hind Indicator Pvt Ltd.' },
    { spec: '2406550082', method: 'G41880/205', actual: 'G41880', remark: '2.5', customer: 'Hind Indicator Pvt Ltd.' },
    { spec: '2406550082', method: 'G41880/205', actual: 'G41880', remark: '2.5', customer: 'Hind Indicator Pvt Ltd.' },
  ];

  const dimensionData = [
    { testType: 'Edge Delivering To Be Do', method: 'VISUAL', result: 'Found OK', final: 'Pass', remark: 'Found OK' },
    { testType: 'No Dent Marks & Damages', method: 'VISUAL', result: 'Acceptable', final: 'Fall', remark: 'Acceptable' },
    { testType: 'No Grinding Marks, Scruches', method: 'VISUAL', result: 'Acceptable', final: 'Pass', remark: 'Acceptable' },
    { testType: 'Part To Be Free', method: 'VISUAL', result: 'Acceptable', final: 'Fall', remark: 'Acceptable' },
    { testType: 'NO SPATTERS', method: 'VISUAL', result: '', final: 'Pass', remark: '' },
    { testType: 'FRONT', method: 'VISUAL', result: '', final: 'Fall', remark: '' },
    { testType: 'IMCE SCC', method: 'VISUAL', result: '', final: 'Pass', remark: '' },
    { testType: 'Spain Aging', method: 'VISUAL', result: '', final: 'Fall', remark: '' },
    { testType: 'Extrasen Cropping', method: 'VISUAL', result: '', final: 'Pass', remark: '' },
    { testType: 'Hotel Expansion Test (HET)', method: 'VISUAL', result: '', final: 'Fall', remark: '' },
  ];

  const processParams = [
    { parameter: 'CURRENT', required: '180-300 A', actual: '250 A', remark: '2.5', wc: 'WELDING' },
    { parameter: 'GAS', required: '12-18 LPM', actual: '16 LPM', remark: '2.5', wc: 'WELDING' },
    { parameter: 'VOLTAGE', required: '22-30 V', actual: '25 V', remark: '2.5', wc: 'WELDING' },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>Production Recording</Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
        </Box>

        {/* Part Details */}
        <Paper sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0' }}>
          <Grid container spacing={2}>
            <Grid item xs={2.4}>
              <TextField 
                label="Part No_REV" 
                fullWidth 
                size="small"
                value={partDetails.partNoRev}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={2.4}>
              <TextField
                label="Part Name"
                fullWidth
                size="small"
                value={partDetails.partName}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={2.4}>
              <TextField
                label="Part No."
                fullWidth
                size="small"
                value={partDetails.partNumber}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={2.4}>
              <TextField
                label="Stage"
                fullWidth
                size="small"
                value={partDetails.stage}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={2.4}>
              <TextField
                label="Welding Wire Batch Code"
                fullWidth
                size="small"
                value={partDetails.batchCode}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Main Table */}
      <Paper sx={{ mb: 3, border: '1px solid #e0e0e0', overflowX: 'auto' }}>
        <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="subtitle1">Stage 2 column header here to group by that column</Typography>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ border: '1px solid #e0e0e0' }}>PART NO</TableCell>
                <TableCell sx={{ border: '1px solid #e0e0e0' }}>REV NO</TableCell>
                <TableCell sx={{ border: '1px solid #e0e0e0' }}>PO_NO.</TableCell>
                <TableCell sx={{ border: '1px solid #e0e0e0' }}>Customer</TableCell>
                <TableCell sx={{ border: '1px solid #e0e0e0' }}>DESIGN</TableCell>
                <TableCell sx={{ border: '1px solid #e0e0e0' }}>CURRENT WC</TableCell>
                <TableCell sx={{ border: '1px solid #e0e0e0' }}>NEXT WC</TableCell>
                <TableCell sx={{ border: '1px solid #e0e0e0' }}>PD Required</TableCell>
                <TableCell sx={{ border: '1px solid #e0e0e0' }}>LAB TEST STATUS</TableCell>
                <TableCell sx={{ border: '1px solid #e0e0e0' }}>Final Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mainTableData.map((row, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.partNo}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.revNo}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.poNo}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.customer}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.design}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.currentWC}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.nextWC}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.pdRequired}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.labTest}</TableCell>
                  <TableCell sx={{ 
                    border: '1px solid #e0e0e0',
                    color: row.result === 'Pass' ? '#4caf50' : '#f44336',
                    fontWeight: 'bold'
                  }}>
                    {row.result}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Bottom Section */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={6}>
          {/* Customer Complaint Check */}
          <Paper sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
            <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="subtitle1">CUSTOMER COMPLAINT CHECK</Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>Spec / Parameter</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>METHOD</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>ACTUAL</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>REMARK</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>Customer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complaintData.map((row, index) => (
                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.spec}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.method}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.actual}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.remark}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.customer}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Process Parameters */}
          <Paper sx={{ border: '1px solid #e0e0e0' }}>
            <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="subtitle1">Process Parameters</Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>SE. Parameter</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>REQUIRED</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>ACTUAL</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>REMARK</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>WORKCENTER</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {processParams.map((row, index) => (
                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.parameter}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.required}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.actual}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.remark}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.wc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Right Column - Dimension Check */}
        <Grid item xs={6}>
          <Paper sx={{ border: '1px solid #e0e0e0' }}>
            <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="subtitle1">DIMENSION CHECK</Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>T Test Type</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>METHOD</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>RESULT</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>Final Result</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>Result Remark</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dimensionData.map((row, index) => (
                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.testType}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.method}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.result}</TableCell>
                      <TableCell sx={{ 
                        border: '1px solid #e0e0e0',
                        color: row.final === 'Pass' ? '#4caf50' : '#f44336',
                        fontWeight: 'bold'
                      }}>
                        {row.final}
                      </TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.remark}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Recording;