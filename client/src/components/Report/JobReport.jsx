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
const ReportDocument = ({ jobs }) => (
  <Document>
    <Page size="A4">
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCol}>TITLE</Text>
          <Text style={styles.tableCol}>COMPANY</Text>
          <Text style={styles.tableCol}>APPLICATIONS</Text>
          <Text style={styles.tableCol}>PUBLISHED DATE</Text>
        </View>
        {jobs?.map((job, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{job.title}</Text>
            <Text style={styles.tableCell}>{job.company.companyName}</Text>
            <Text style={styles.tableCell}>{job.activeApplications}</Text>
            <Text style={styles.tableCell}>{job.created.split("T")[0]}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ReportDocument;
