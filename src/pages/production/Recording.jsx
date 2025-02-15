import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Select,
  MenuItem,
  IconButton,
  Grid,
  TextField,
  Paper,
  Button,
  Checkbox
} from '@mui/material';
import { Search, Refresh, Update } from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const initialData = {
  dimension: [
    { testType: 'Edge Deburring To Be Do', method: 'VISUAL', result: 'Found Ok', final: 'Pass', remark: 'Found Ok' },
    { testType: 'No Dent Marks & Damages', method: 'VISUAL', result: 'Acceptable', final: 'Fall', remark: 'Acceptable' },
    { testType: 'No Grinding Marks, Scratches', method: 'VISUAL', result: 'Acceptable', final: 'Pass', remark: 'Acceptable' },
    { testType: 'Part To Be Free', method: 'VISUAL', result: 'Acceptable', final: 'Fall', remark: 'Acceptable' },
    { testType: 'NO SPATTERS', method: 'VISUAL', result: 'Pass', final: 'Pass', remark: 'FRONT' },
    { testType: 'NACE SCC', method: 'VISUAL', result: 'Pass', final: 'Pass', remark: '' },
    { testType: 'Strain Aging', method: 'VISUAL', result: 'Fall', final: 'Fall', remark: '' },
    { testType: 'Erichsen Cupping', method: 'VISUAL', result: 'Pass', final: 'Pass', remark: '' },
    { testType: 'Hotel Expansion Test (HET)', method: 'VISUAL', result: 'Fall', final: 'Fall', remark: '' },
  ]
};

const Recording = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [results, setResults] = useState({
    dimension: initialData.dimension.reduce((acc, curr, idx) => ({
      ...acc,
      [idx]: curr.final
    }), {})
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleResultChange = (testType, index, newValue) => {
    setResults(prev => ({
      ...prev,
      [testType]: { ...prev[testType], [index]: newValue }
    }));
  };

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

  const processParamsData = [
    { parameter: 'Pressure', required: '100psi', actual: '95psi', remark: 'Low', wc: 'JIT7A' },
    { parameter: 'Temperature', required: '200°C', actual: '195°C', remark: 'OK', wc: 'JIT7A' },
    { parameter: 'Flow Rate', required: '50L/min', actual: '48L/min', remark: 'Low', wc: 'JIT7A' },
  ];

  // Handle row selection
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = mainTableData.map(row => row.partNo);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (event, partNo) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, partNo]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== partNo));
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Production Recording" />
            <Tab label="Other Tab" disabled />
          </Tabs>
          
          <Box>
            <IconButton sx={{ mr: 1 }}>
              <Refresh fontSize="medium" />
            </IconButton>
            <IconButton>
              <Search fontSize="medium" />
            </IconButton>
          </Box>
        </Box>

        {/* Part Details */}
        <Paper sx={{ p: 2, mb: 2, border: "1px solid #e0e0e0" }}>
          <Grid container spacing={2} alignItems="center">
            {Object.entries(partDetails).map(([key, value]) => (
              <Grid item xs={2.4} key={key}>
                <TextField
                  label={key.split(/(?=[A-Z])/).join(" ").toUpperCase()}
                  fullWidth
                  size="small"
                  value={value}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            ))}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" color="primary">
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Main Table */}
      <Paper sx={{ mb: 3, border: '1px solid #e0e0e0', overflowX: 'auto' }}>
        <Box sx={{ 
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#e3f2fd',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography variant="subtitle1">Drag a column header here to group by that column</Typography>
          <Box>
            <IconButton sx={{ mr: 1 }}>
              <Refresh fontSize="small" />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<Update />}
              size="small"
              disabled={selectedRows.length === 0}
            >
              Update All
            </Button>
          </Box>
        </Box>
        
        <TableContainer>
          <Table sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ border: '1px solid #e0e0e0', p: 0.5 }}>
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < mainTableData.length}
                    checked={selectedRows.length === mainTableData.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
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
                  <TableCell sx={{ border: '1px solid #e0e0e0', p: 0.5 }}>
                    <Checkbox
                      checked={selectedRows.includes(row.partNo)}
                      onChange={(e) => handleRowSelect(e, row.partNo)}
                    />
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.partNo}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.revNo}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.poNo}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.customer}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>
                    <Button 
                      variant="text"
                      onClick={() => console.log('Design clicked:', row.design)}
                      sx={{ p: 0, textTransform: 'none' }}
                    >
                      {row.design}
                    </Button>
                  </TableCell>
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
          <Paper sx={{ mb: 3, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
            <Box sx={{ p: 1.5, backgroundColor: '#e3f2fd', borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e88e5' }}>
                CUSTOMER COMPLAINT CHECK
              </Typography>
            </Box>
            <TableContainer>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>SR.</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>Spec / Parameter</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>METHOD</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>ACTUAL</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>REMARK</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>Customer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3, 4].map((index) => (
                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>{index}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>Spec {index}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>Method {index}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>Actual {index}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>Remark {index}</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>Customer {index}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Process Parameters Table */}
          <Paper sx={{ mb: 3, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
            <Box sx={{ p: 1.5, backgroundColor: '#e3f2fd', borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e88e5' }}>
                PROCESS PARAMETERS
              </Typography>
            </Box>
            <TableContainer>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>Parameter</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>Required</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>Actual</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>Remark</TableCell>
                    <TableCell sx={{ border: '1px solid #e0e0e0' }}>Work Center</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {processParamsData.map((row, index) => (
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="DIMENSION CHECK" />
                <Tab label="WELDING TEST" />
                <Tab label="FABRICATION TEST" />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>Test Type</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>METHOD</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>RESULT</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>Final Result</TableCell>
                      <TableCell sx={{ border: '1px solid #e0e0e0' }}>Result Remark</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {initialData.dimension.map((row, index) => (
                      <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                        <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.testType}</TableCell>
                        <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.method}</TableCell>
                        <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.result}</TableCell>
                        <TableCell sx={{ 
                          border: '1px solid #e0e0e0',
                          color: results.dimension[index] === 'Pass' ? '#4caf50' : '#f44336',
                          fontWeight: 'bold'
                        }}>
                          <Select
                            value={results.dimension[index]}
                            onChange={(e) => handleResultChange('dimension', index, e.target.value)}
                            sx={{ 
                              border: 'none',
                              '& .MuiSelect-select': { padding: '8px' }
                            }}
                          >
                            <MenuItem value="Pass">Pass</MenuItem>
                            <MenuItem value="Fall">Fail</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell sx={{ border: '1px solid #e0e0e0' }}>{row.remark}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Recording;