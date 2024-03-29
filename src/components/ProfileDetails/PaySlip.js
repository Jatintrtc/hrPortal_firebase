import { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { DatePicker, Space } from "antd";
import "../../style/Payslip.css";
import EmployeeNetSalary from "../../contexts/EmployeeNetSalary";
import CompanyProContext from "../../contexts/CompanyProContext";
import { createPdfFromHtml } from "./downloadLogic";
import moment from 'moment';

function PaySlip(props) {
  const showRecord = props.data;
  const [userid, setUserId] = useState(props.id);
  const [month, setMonth] = useState(null);
  const [printContent, setPrintContent] = useState(null);
  const [dataMonths, setDataMonths] = useState(false);
  const [paySlipData, setPaySlipData] = useState(false);
  const [allPaySlipData, setAllPaySlipData] = useState(false);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [companyProfile, setCompanyProfile] = useState([]);
  const compId = sessionStorage.getItem("compId");
  const [earningArray, setEarningArray] = useState([]);
  const [deductionArray, setDeductionArray] = useState([]);

  const currentMonth = moment();//current month
  const previousMonth = moment().subtract(1, 'month');//previous month
  const numberOfDaysInMonth = previousMonth.daysInMonth();//day in month
  const [nofDaysInMonth, setNofDaysInMonth] = useState(numberOfDaysInMonth);//set day in month
  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const [selectedMonth, setSelectedMonth] = useState(`${previousMonth.format("MMM")}-${previousMonth.format("YYYY")}`);

  const updateSelectedMonth = (date) => {
    let field = date.format("MMM_YYYY")
    let index = dataMonths.includes(field) ? field : null;
    if (index == null) {
      let allMonths = dataMonths.filter((x) => {
        let value = moment(x, "MMM_YYYY").isBefore(date);
        // console.log(value);
        return value;
      });
      allMonths.sort((a, b) => moment(b, "MMM_YYYY").format('YYYYMMDD') - moment(a, "MMM_YYYY").format('YYYYMMDD'))
      // console.log(allMonths[0]);
      index = allMonths[0];

    }
    const selectedDate = new Date(date);
    let month = selectedDate.getMonth();
    setMonth(month)
    const year = selectedDate.getFullYear();
    // console.log("selected date: ", year);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const selectedMonthYear = `${monthNames[month]} ${year}`;
    // console.log("selected month-year: ", selectedMonthYear);
    setSelectedMonth(selectedMonthYear);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // console.log("daysInMonth: ", daysInMonth)
    setNofDaysInMonth(daysInMonth);
    // console.log(allPaySlipData);
    // console.log('jjj', allPaySlipData[index].deductionArray[0].value);
    // console.log('jjj', allPaySlipData[index].earningArray[0].value);
    setPaySlipData(allPaySlipData[index])
    // console.log('jjj', setPaySlipData(allPaySlipData[index]));
    // setDeductionArray(allPaySlipData[index].deductionArray[0])
    // setEarningArray(allPaySlipData[index].earningArray[0])
    //allPaySlipData[index].deductionArray[0]
  };
  const disabledDate = (currentDate) => {
    return currentDate && (currentDate.isAfter(currentMonth) || currentDate.isSame(currentMonth, 'month'));
  };


  useEffect(() => {
    console.log("props.data.id", props)
    setUserId(props.id)
    getSalaryData(props.id)
    getCompanyProfile()


  }, [props.id]);

  function RupeeSign({ amount }) {
    return (
      <span>₹ {amount}</span>
    );
  }
  // number to words
  function numberToWords(n) {
    if (n < 20) return units[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + units[n % 10] : "");
    if (n < 1000) return units[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + numberToWords(n % 100) : "");
    if (n < 1000000) return numberToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + numberToWords(n % 1000) : "");
    return numberToWords(Math.floor(n / 1000000)) + " Million" + (n % 1000000 !== 0 ? " " + numberToWords(n % 1000000) : "");
  }

  function formatNetSalary(amount) {
    return `( ${numberToWords(amount)} Only)`;
  }

  async function getSalaryData(id) {
    // console.log("aaa", id);
    // console.log("aaa", compId);
    const allSalaryPaySlip = await EmployeeNetSalary.getSalary(id);
    // console.log("aaa", currentUser.uid);
    // console.log("aaa", allSalaryPaySlip);
    setAllPaySlipData(allSalaryPaySlip);
    setDataMonths(Object.keys(allSalaryPaySlip))
    updateSelectedMonth(moment())
  }

  const getCompanyProfile = async () => {
    const companyProfile = await CompanyProContext.getCompanyProfile(compId);
    // console.log(companyProfile, "companyProfile")
    setCompanyProfile(companyProfile);
  }

  return (
    <>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          className="card"
          title="Pay Slip"
          style={{
            width: "790px",
            marginTop: "3px",

            height: "auto",
          }}
        >
          <Space direction="vertical" size={12}>
            <div
              className="date"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <DatePicker
                picker="month"
                className="picker"
                placeholder="Select MM & YY"
                bordered={true}
                format="MM-YYYY"
                style={{
                  width: "100%",
                  background: "#1890ff",
                  cursor: "pointer",
                }}
                allowClear
                defaultValue={previousMonth}
                disabledDate={disabledDate}
                onChange={updateSelectedMonth}
              />
            </div>
          </Space>
          {paySlipData ? (
            <>
              <Button
                className="button"
                style={{
                  background: "#1890ff",
                  color: "white",
                  marginLeft: "40rem",
                }}
                type="button"
                onClick={() => {
                  createPdfFromHtml(printContent);
                }}
              >
                Download
              </Button>
              <div className="mainBorder A4" id="payslip">
                <div
                  ref={(el) => {
                    setPrintContent(el);
                  }}
                >
                  <SlipHtml
                    selectedMonth={selectedMonth}
                    nofDaysInMonth={nofDaysInMonth}
                    showRecord={showRecord}
                    earning={earningArray}
                    deduction={deductionArray}


                  />
                </div>
              </div>
            </>
          ) : null}
        </Card>
      </div>
    </>
  );

  function SlipHtml({ selectedMonth, year, nofDaysInMonth, showRecord, earning, deduction }) {
    // console.log('showRecord', selectedMonth, year, nofDaysInMonth, showRecord, earning, deduction)


    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="sheet">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row-reverse",
              }}
            >
              <div></div>
              <div style={{ marginLeft: '-135px' }} className="heading">
                <h1 style={{ fontSize: "14px", textAlign: "center" }}>
                  {/* Humantech Solutions India Private Limited */}
                  {companyProfile.regCompName}
                </h1>
                <h2 style={{ fontSize: "14px", textAlign: "center" }}>
                  Payslip for the month of {selectedMonth}  {year}
                </h2>
              </div>
              <div style={{
                margin: '10px'
              }}>
                <img
                  src={companyProfile.logo}
                  style={{
                    marginRight: "34px",
                    width: "100px",
                  }}
                ></img>
              </div>
            </div>
            <div className="firstSplit">
              <div className="splitLeft">
                <table>
                  <tr>
                    <td
                      style={{
                        width: "195px",
                      }}
                    >
                      Employee Code:
                    </td>
                    <td
                      style={{
                        width: "195px",
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {showRecord.empId ? showRecord.empId : '0'}

                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "195px",

                      }}
                    >
                      Name:
                    </td>
                    <td
                      style={{
                        width: "195px",
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {showRecord.fname ? showRecord.fname : '0'}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "180px",
                      }}
                    >
                      Designation:
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {showRecord.designation ? showRecord.designation : '0'}
                    </td>
                    {/* <td
                style={{
                  width: "30px",
                  textAlign: "end",

                  cursor: "pointer",
                }}
              >
                <DeleteOutlined />
              </td> */}
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "180px",

                      }}
                    >
                      Date of Joining:
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {showRecord.doj ? showRecord.doj : '0'}
                    </td>
                  </tr>
                </table>
              </div>
              <div className="splitRight">
                <table>
                  <tr>
                    <td
                      style={{
                        width: "180px",
                      }}
                    >
                      Total Days:
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {nofDaysInMonth}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "180px",
                      }}
                    >
                      Days Paid:
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {nofDaysInMonth}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "180px",
                      }}
                    >
                      Bank:
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {showRecord?.bank && showRecord?.bank[0].bankName ? showRecord?.bank[0].bankName : 0}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "180px",
                      }}
                    >
                      Bank Acc. No.:
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {/* {console.log('showRecord.bank[0].accountNo', showRecord.bank[0].accountNo)} */}
                      {/* {showRecord?.bank[0]?.accountNo ? showRecord?.bank[0]?.accountNo : 0} */}
                    </td>
                  </tr>
                  <tr>
                    {/* <td
                      style={{
                        width: "180px",
                      }}
                    >
                      LWP:
                    </td> */}
                    <td
                      style={{
                        width: "180px",
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {/* {console.log('showRecord.bank[0].accountNo', showRecord.bank[0].accountNo)} */}
                      {/* {showRecord.bank[0].accountNo ? showRecord.bank[0].accountNo : 0} */}
                    </td>
                  </tr>

                </table>
              </div>
            </div>
            <div className="secondSplit">
              <div className="splitSecond">
                <table>
                  <thead>
                    <tr className="head1">
                      <th
                        style={{
                          width: "196px",
                          textAlign: "left",
                        }}
                      >
                        Earnings
                      </th>
                      <th
                        style={{
                          width: "196px",
                        }}
                      >
                        Amount(INR)
                      </th>
                    </tr>
                  </thead>
                  <tr>
                    <td
                      style={{
                        width: "700px",
                      }}
                    >
                      Basic Salary:
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.basic ? paySlipData.basic : 0}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "700px",
                      }}
                    >
                      House Rent Allowance:
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.hra ? paySlipData.hra : 0}
                    </td>
                  </tr>
                      
                  {Object.keys(paySlipData?.earnings)?.map((x) => (<tr>
                    <td
                      style={{
                        width: "700px",
                      }}
                    >
                      {x}
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData?.earnings[x]}
                    </td>
                  </tr>))}

                  {/* {Object.keys(paySlipData).map((field) => (
                    <tr key={field}>
                      <td style={{ width: "700px" }}>{field}:</td>
                      <td style={{ width: "180px", textAlign: 'left', paddingLeft: '40px' }}>
                        {paySlipData[field] ? paySlipData[field] : 0}
                      </td>
                    </tr>
                  ))} */}

                </table>
              </div>
              <div className="splitThird">
                <table>
                  <thead>
                    <tr className="head2">
                      <th
                        style={{
                          width: "400px",
                          textAlign: 'left',
                          paddingLeft: '40px'
                        }}
                      >
                        Deductions
                      </th>
                      <th
                        style={{
                          width: "180px",
                          textAlign: 'left',
                        }}
                      >
                        Amount(INR)
                      </th>
                    </tr>
                  </thead>
                  {/* {console.log(paySlipData.deductions)} */}
                  {Object.keys(paySlipData?.deductions).map((x) => (
                  <tr>
                    <td
                      style={{
                        width: "700px",
                      }}
                    >
                      {/* {console.log(x)} */}
                      {x}
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData?.deductions[x]}
                    </td>
                  </tr>))}

                </table>
              </div>
            </div>
            <div className="thirdSplit">
              <div className="splitFourth">
                <table>
                  <tr>
                    <td
                      style={{
                        width: "197px",
                        fontWeight: "500",
                      }}
                    >
                      Total Earnings(Rs)
                    </td>
                    <td
                      style={{
                        width: "85px",
                        fontWeight: "500",
                        textAlign: "right",
                      }}
                    >
                      <RupeeSign amount={paySlipData.totalEarning ? paySlipData.totalEarning : 0} />

                    </td>
                  </tr>
                </table>
              </div>
              <div className="splitFifth">
                <table>
                  <tr>
                    <td
                      style={{
                        width: "197px",
                        fontWeight: "500",
                      }}
                    >
                      Total Deductions(Rs)
                    </td>
                    <td
                      style={{
                        width: "85px",
                        fontWeight: "500",
                        textAlign: "right",
                      }}
                    >
                      <RupeeSign amount={paySlipData.totalDeduction ? paySlipData.totalDeduction : 0} />
                      {/* {paySlipData.totalDeduction} */}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="netPay">
              <table>
                <tr>
                  <td>Net Pay:</td>
                  <td style={{ width: "178px", textAlign: "start" }}>
                    {" "}
                    <RupeeSign amount={paySlipData.netSalaryIncome} />

                  </td>
                  <td style={{ width: "420px" }}>{formatNetSalary(paySlipData.netSalaryIncome ? paySlipData.netSalaryIncome : 0)}</td>
                </tr>
              </table>
            </div>
            <hr style={{ marginRight: "28px" }}></hr>
            <p style={{ textAlign: "center", padding: "10px 0px 10px 0px" }}>
              This is a system generated payslip and does not require signature
            </p>
          </div>
        </div>
      </>
    );
  }
}
export default PaySlip;
