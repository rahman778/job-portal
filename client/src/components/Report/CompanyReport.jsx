import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  table: { display: "table", width: "auto", margin: '20px 10px' },
  tableRow: { flexDirection: "row", alignItems: 'flex-start' },
  tableCol: { width: "25%", borderStyle: "solid", padding: '8px 0', borderWidth: 1, fontSize: 10, textAlign: 'center', borderColor: '#000' },
  tableCell: { width: "25%", paddingTop: 5, textAlign: 'center', fontSize: 10 },
  tableHeader: { backgroundColor: "#f0f0f0", fontWeight: "bold" },
});

// Create Document Component
const CompanyReportDocument = ({ jobs }) => (
  <Document>
    <Page size="A4">
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCol}>Company Name</Text>
          <Text style={styles.tableCol}>Company Email</Text>
          <Text style={styles.tableCol}>No of Job Posted</Text>
          <Text style={styles.tableCol}> Applications</Text>
        </View>
        {jobs?.map((job, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{job.companyName}</Text>
            <Text style={styles.tableCell}>{job.email}</Text>
            <Text style={styles.tableCell}>{job.applicationsReceived}</Text>
            <Text style={styles.tableCell}>{job.jobsPosted.length || 0}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default CompanyReportDocument;
