import { PDFDownloadLink } from "@react-pdf/renderer";
import { useGetCompanyJobReportQuery } from "../../services/jobService";
import CompanyReportDocument from "../../components/Report/CompanyReport";

function CompanyReport() {
  const { data: jobReport } = useGetCompanyJobReportQuery();

  return (
    <section className="max-w-6xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 mt-10">
      <div className="flex flex-wrap">
        <div className="w-full max-w-full px-3 mb-6 mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-sm">
            <div className="relative flex flex-col min-w-0 break-words border bg-clip-border rounded-sm border-slate-200 dark:border-slate-700">
              <div className="flex-auto block p-2 xl:pb-2 xl:pt-6 xl:px-9">
                <div className="flex justify-end">
                  <PDFDownloadLink
                    document={<CompanyReportDocument jobs={jobReport} />}
                    fileName="company_report.pdf"
                    className="button primary-outline-btn py-2 px-3"
                  >
                    {({ loading }) =>
                      loading ? "Generating report..." : "Download Report"
                    }
                  </PDFDownloadLink>
                </div>

                <div className="overflow-x-auto mt-10">
                  <table className="w-full my-0 align-middle">
                    <thead className="align-bottom border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="pb-3 text-start min-w-[100px] font-medium"></th>
                        <th className="pb-3 text-start min-w-[100px] font-medium">
                          Company Name
                        </th>
                        <th className="pb-3 text-center min-w-[100px] font-medium">
                          Company Email
                        </th>
                        <th className="pb-3 text-center min-w-[100px] font-medium">
                          No of Job Posted
                        </th>
                        <th className="pb-3 text-center min-w-[100px] font-medium">
                          Applications
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobReport?.map((job, index) => (
                        <tr
                          key={index}
                          className="border-b last:border-b-0 border-slate-200 dark:border-slate-700 text-md"
                        >
                          <td className="text-center">
                            <img
                              alt="Logo"
                              //src="@/assets/logo.svg?url"
                              src={
                                job.logo ??
                                "https://placehold.co/600x400/000000/FFF"
                              }
                              width="45"
                              height="45"
                            />
                          </td>
                          <td className="py-5 pl-0">
                            <div className="flex flex-col justify-start">
                              <span>{job.companyName}</span>
                            </div>
                          </td>
                          <td className="text-center">
                            <span className="">{job.email}</span>
                          </td>
                          <td className="text-center">
                            <span>{job.applicationsReceived}</span>
                          </td>

                          <td className="text-center">
                            <span>{job.jobsPosted.length || 0}</span>
                          </td>

                          <td className="text-end flex items-center justify-end h-[63px]"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanyReport;
