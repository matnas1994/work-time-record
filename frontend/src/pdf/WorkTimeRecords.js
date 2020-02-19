import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font
} from "@react-pdf/renderer";


Font.registerHyphenationCallback(word => [word]);

Font.register({
  family: "Roboto",
  src: `https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc0CsE.ttf`
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 42.5197,
    fontFamily: "Roboto",
    color: "black"
  },
  test: {
    flexDirection: "row",
    border: "none",
    borderTop: "1pt solid #000",
    margin: 0
  },
  text: {
    textAlign: "center",
    fontSize: 7,
    color: "black",
    fontWeight: "normal"
  },
  borderNone: {
    borderRight: "none"
  },
  table: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
    border: "1pt solid #000"
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
    borderCollapse: "collapse"
  },
  tableCell: {
    flex: 1,
    fontSize: 6.5,
    fontWeight: "bold",
    borderTop: "1pt solid #000",
    borderRight: "1pt solid #000",
    flexDirection: "row",
    flexWrap: "wrap",
    lineHeight: "100%",
    textAlign: "center",
    alignContent: "stretch",
    marginBottom: 0
  }
});

const PdfWorkTimeRecords = props => {
  console.log(props.workTimeRecords);
  if(!props.workTimeRecords){
    return;
  }

  const tableRows = props.workTimeRecords.days.map((dayValue, index) => {
    return (
      <View key={index} style={styles.tableRow}>
        <View style={[styles.tableCell, { flex: 0.4 }]}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell]}>
              <Text>{index + 1}</Text>
            </View>
            <View style={[styles.tableCell]}>
              <Text>{dayValue.normal || ""}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.tableCell, { flex: 0.6 }]}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell]}>
              <Text>{dayValue.begin || ""}</Text>
            </View>
            <View style={[styles.tableCell]}>
              <Text>{dayValue.end || ""}</Text>
            </View>

            <View style={[styles.tableCell]}>
              <Text>{dayValue.begin || ""}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.tableCell, { flex: 0.5 }]}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell]}>
              <Text>{dayValue.personalExit?.begin || ""}</Text>
            </View>
            <View style={[styles.tableCell]}>
              <Text>{dayValue.personalExit?.end || ""}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.tableCell, { flex: 0.3, alignItems: "center" }]}>
          <Text>{dayValue.overtime || ""}</Text>
        </View>

        <View style={styles.tableCell}>
          <View style={[styles.tableRow, { flex: 0.91 }]}>
            <View style={[styles.tableCell]}>
              <Text>
                {dayValue.absence?.reason === "1" ? dayValue.absence?.time : ""}
              </Text>
            </View>
            <View style={[styles.tableCell]}>
              <Text>
                {dayValue.absence?.reason === "2" ? dayValue.absence?.time : ""}
              </Text>
            </View>
            <View style={[styles.tableCell]}>
              <Text>
                {dayValue.absence?.reason === "3" ? dayValue.absence?.time : ""}
              </Text>
            </View>
            <View style={[styles.tableCell]}>
              <Text>
                {dayValue.absence?.reason === "4" ? dayValue.absence?.time : ""}
              </Text>
            </View>
            <View style={[styles.tableCell]}>
              <Text>
                {dayValue.absence?.reason === "5" ? dayValue.absence?.time : ""}
              </Text>
            </View>
          </View>
          <View style={[styles.tableCell, { flex: 0.09 }]}>
            <Text>
              {dayValue.absence?.reason === "6" ? dayValue.absence?.time : ""}
            </Text>
          </View>
        </View>
      </View>
    );
  });

  return (
    <Document>
      <Page style={styles.page} size={[842, 595]}>
        <Text>Imię i nazwisko pracownika: Jan Kowalski</Text>
        <Text>Stanowisko: Nauczyciel</Text>
        <Text>EWIDENCJA CZASU PRACY 2020</Text>
        <Text>Miesiąc: Luty</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, { flex: 0.4, borderTop: "none" }]}>
              <Text style={{ alignSelf: "center" }}>
                Czas pracy do rozliczenia
              </Text>
              <View style={[styles.tableRow]}>
                <View style={[styles.tableCell]}>
                  <Text style={{ alignSelf: "center" }}>Dzień</Text>
                </View>
                <View style={[styles.tableCell, styles.borderNone]}>
                  <Text style={{ alignSelf: "center" }}>
                    Normalny czas pracy
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.tableCell, { flex: 0.6, borderTop: "none" }]}>
              <Text style={{ alignSelf: "center" }}>Faktyczny czas pracy</Text>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell]}>
                  <Text style={{ alignSelf: "center" }}>
                    Godzina rozpoczęcia pracy
                  </Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={{ alignSelf: "center" }}>
                    Godzina zakonczenia pracy
                  </Text>
                </View>
                <View style={[styles.tableCell, styles.borderNone]}>
                  <Text style={{ alignSelf: "center" }}>
                    Czas pracy w godzinach
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.tableCell, { flex: 0.5, borderTop: "none" }]}>
              <Text style={{ alignSelf: "center" }}>
                Wyjścia w celach osobistych
              </Text>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell]}>
                  <Text style={{ alignSelf: "center" }}>Godzina wyjścia</Text>
                </View>
                <View style={[styles.tableCell, styles.borderNone]}>
                  <Text style={{ alignSelf: "center" }}>Godzina powrotu</Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.tableCell,
                { flex: 0.3, alignItems: "center", borderTop: "none" }
              ]}
            >
              <Text style={{ alignSelf: "center" }}>Godziny nadliczbowe</Text>
            </View>

            <View
              style={[
                styles.tableCell,
                styles.borderNone,
                { borderTop: "none" }
              ]}
            >
              <Text style={{ alignSelf: "center" }}>
                Dni wolne od pracy określone w godzinach
              </Text>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell]}>
                  <Text style={{ alignSelf: "center" }}>
                    Godzina rozpoczęcia pracy
                  </Text>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCell]}>
                      <Text style={{ alignSelf: "center" }}>
                        Urlop wypoczynkowy
                      </Text>
                    </View>
                    <View style={[styles.tableCell]}>
                      <Text style={{ alignSelf: "center" }}>
                        Zwolnienie lekarskie
                      </Text>
                    </View>
                    <View style={[styles.tableCell]}>
                      <Text style={{ alignSelf: "center" }}>
                        Urlop okol./ opieka
                      </Text>
                    </View>
                    <View style={[styles.tableCell]}>
                      <Text style={{ alignSelf: "center" }}>
                        Delegacje i szkolenia
                      </Text>
                    </View>
                    <View style={[styles.tableCell, styles.borderNone]}>
                      <Text style={{ alignSelf: "center" }}>Inne</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[styles.tableCell, styles.borderNone, { flex: 0.1 }]}
                >
                  <Text style={{ alignSelf: "center" }}>Nu</Text>
                </View>
              </View>
            </View>
          </View>
          {tableRows}
        </View>
      </Page>
    </Document>
  );
};

export default React.memo(PdfWorkTimeRecords);
