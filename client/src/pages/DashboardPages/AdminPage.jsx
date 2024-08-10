import {
  ChevronRightIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import {} from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetJobsQuery } from "../../services/jobService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportDocument from "../../components/Report/JobReport";

function AdminPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: jobs } = useGetJobsQuery(
    searchParams.toString().replace(/%2C/g, ","),
    { refetchOnMountOrArgChange: true }
  );

  const navigate = useNavigate();

  const handleFilterChange = (key, value) => {
    setSearchParams((prevParams) => {
      let searchVal = prevParams.get(key);

      prevParams.set(key, value);

      if (searchVal === value) {
        prevParams.delete(key);
      }

      return prevParams;
    });
  };

  return (
    <section className="max-w-6xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 mt-10">
      <div className="flex flex-wrap">
        <div className="w-full max-w-full px-3 mb-6 mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-sm">
            <div className="relative flex flex-col min-w-0 break-words border bg-clip-border rounded-sm border-slate-200 dark:border-slate-700">
              <div className="flex-auto block p-2 xl:pb-2 xl:pt-6 xl:px-9">
                <div className="flex items-center justify-between">
                  <div className="flex flex-row items-center gap-x-4">
                    <div>
                      <label htmlFor="startDate" className="label">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={searchParams.get("startDate") || ""}
                        className="input"
                        onChange={(e) =>
                          handleFilterChange("startDate", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label htmlFor="startDate" className="label">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={searchParams.get("endDate") || ""}
                        className="input"
                        onChange={(e) =>
                          handleFilterChange("endDate", e.target.value)
                        }
                      />
                    </div>

                    <Link
                      to={`/dashboard`}
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-500 cursor-pointer"
                    >
                      Clear Filters
                    </Link>
                  </div>
                  <div className="">
                    <PDFDownloadLink
                      document={<ReportDocument jobs={jobs?.data} />}
                      fileName="job_report.pdf"
                      className="button primary-outline-btn py-2 px-3"
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "Generating report..." : "Download Report"
                      }
                    </PDFDownloadLink>
                  </div>
                </div>

                <div className="overflow-x-auto mt-10">
                  <table className="w-full my-0 align-middle">
                    <thead className="align-bottom border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="pb-3 text-start min-w-[100px] font-medium">
                          TITLE
                        </th>
                        <th className="pb-3 text-center min-w-[100px] font-medium">
                          Company
                        </th>
                        <th className="pb-3 text-center min-w-[100px] font-medium">
                          APPLICATIONS
                        </th>
                        <th className="pb-3 text-start min-w-[100px] font-medium">
                          PUBLISHED DATE
                        </th>

                        <th className="pb-3 text-end min-w-[60px] font-medium">
                          DETAILS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs?.data.map((job) => (
                        <tr
                          key={job._id}
                          className="border-b last:border-b-0 border-slate-200 dark:border-slate-700 text-md"
                        >
                          <td className="py-5 pl-0">
                            <div className="flex flex-col justify-start">
                              <span>{job.title}</span>
                            </div>
                          </td>
                          <td className="text-center">
                            <span className="">{job.company.companyName}</span>
                          </td>
                          <td className="text-center">
                            <span>{job.activeApplications}</span>
                          </td>

                          <td className="text-left">
                            <span>{job?.created.split("T")[0]}</span>
                          </td>

                          <td className="text-end flex items-center justify-end h-[63px]">
                            <button
                              className="rounded-full w-8 h-8 flex items-center justify-center bg-emerald-600/10 hover-transition hover:bg-emerald-600/30 mr-2"
                              onClick={() =>
                                navigate(
                                  `/company/${job.company._id}/job/${job._id}`
                                )
                              }
                            >
                              <PencilSquareIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 click-transition" />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/company/job/${job._id}/manage`)
                              }
                              className="rounded-full w-8 h-8 flex items-center justify-center bg-emerald-600/10 hover-transition hover:bg-emerald-600/30"
                            >
                              <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 click-transition" />
                            </button>
                          </td>
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

export default AdminPage;
