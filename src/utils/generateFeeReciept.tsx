import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { FeeData } from "@/types/feeData";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    fontSize: 12,
    padding: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  studentInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
});

const FeeReceipt: React.FC<{ feeData: FeeData }> = ({ feeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>
        Indian Institute of Information Technology
      </Text>
      <View style={styles.section}>
        <Text style={styles.title}>Student Details</Text>
        <Text style={styles.studentInfo}>Name: {feeData.student.name}</Text>
        <Text style={styles.studentInfo}>
          Roll Number: {feeData.student.rollNumber}
        </Text>
        <Text style={styles.studentInfo}>Email: {feeData.student.email}</Text>
        <Text style={styles.studentInfo}>Semester: {feeData.semester}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Fee Details</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Description</Text>
          <Text style={styles.cell}>Transaction ID</Text>
          <Text style={styles.cell}>Date</Text>
          <Text style={styles.cell}>Amount</Text>
        </View>
        {feeData.fees.map((fee: any, index: any) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.cell}>{fee.description}</Text>
            <Text style={styles.cell}>{fee.transactionId}</Text>
            <Text style={styles.cell}>{fee.date}</Text>
            <Text style={styles.cell}>{fee.amount}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const downloadPDF = async (feeData: FeeData) => {
  const blob = await pdf(<FeeReceipt feeData={feeData} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fee-receipt.pdf";
  a.click();
};

export default downloadPDF;
