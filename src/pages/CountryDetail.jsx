import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {
  fetchCountryByCode,
  fetchCountryIncomeInfo,
} from "../service/countryService";
import { formatPopulation, formatCapital } from "./../utils/formatter";
import FavButton from "../components/FavButton";
import {
  UserGroupIcon,
  MapPinIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  NewspaperIcon,
  MapIcon,
  PhoneIcon,
  GlobeAmericasIcon,
  CalendarDaysIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import useCountrySummary from "../hooks/useCountrySummary";
import useCountryNews from "../hooks/useCountryNews";
import Spinner from "../components/Spinner";
import DetailRow from "../components/DetailRow";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import PercentageLineChart from "../components/PercentageLineChart";
import PendingCountryDetails from "../components/PendingDetails";
import useTypewriter from "../hooks/useTypewriter";
import SummaryTypeWriter from "../components/SummaryTypeWriter";

export default function CountryDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(() => fetchCountryByCode(id));
  const country = data?.[0];

  const gdpUrl = country?.cca3
    ? `https://api.worldbank.org/v2/country/${country.cca3}/indicators/NY.GDP.MKTP.KD.ZG?format=json&per_page=100`
    : null;
  const {
    data: gdpData,
    loading: gdpLoading,
    error: gdpError,
  } = useFetch(() =>
    gdpUrl ? fetchCountryIncomeInfo(gdpUrl) : Promise.resolve(null),
  );

  const inflationUrl = country?.cca3
    ? `https://api.worldbank.org/v2/country/${country.cca3}/indicators/FP.CPI.TOTL.ZG?format=json&per_page=100`
    : null;
  const {
    data: inflation,
    loading: inflationLoading,
    error: inflationError,
  } = useFetch(() =>
    inflationUrl ? fetchCountryIncomeInfo(inflationUrl) : Promise.resolve(null),
  );

  const unemploymentUrl = country?.cca3
    ? `https://api.worldbank.org/v2/country/${country.cca3}/indicators/SL.UEM.TOTL.NE.ZS?format=json&per_page=100`
    : null;
  const {
    data: unemployment,
    loading: unemploymentLoading,
    error: unemploymentError,
  } = useFetch(() =>
    unemploymentUrl
      ? fetchCountryIncomeInfo(unemploymentUrl)
      : Promise.resolve(null),
  );

  const {
    summary,
    loading: summaryLoading,
    error: summaryError,
  } = useCountrySummary(country);

  const {
    articles,
    loading: newsLoading,
    error: newsError,
  } = useCountryNews(country?.name.common);

  return (
    <>
      <div>
        {loading && <PendingCountryDetails />}
        {error && (
          <p className="text-red-500 text-center mt-20">
            Error: {error.message}
          </p>
        )}

        {data && (
          <div className="flex flex-col md:flex-row min-h-screen">
            {/* ── Left Side (Sticky) ── */}
            <div className="md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-1/3 overflow-y-auto p-8 flex flex-col justify-center border-r border-gray-200">
              {/* Flag */}
              <img
                src={country.flags.svg}
                alt={country.flags.alt}
                className="rounded shadow-sm w-full"
              />

              {/* Name + Fav */}
              <div className="mt-4 mb-3">
                <div className="flex justify-between items-start gap-2">
                  <h1 className="text-3xl font-bold text-gray-800 uppercase leading-tight">
                    {country.name.common}
                  </h1>
                  <FavButton countryData={country} />
                </div>
                <p className="text-gray-500 italic text-sm">
                  {country.name.official}
                </p>
              </div>

              {/* Quick stats */}
              <div className="flex flex-col gap-2 text-sm text-gray-700 mt-2">
                <p className="flex items-center gap-2">
                  <MapPinIcon className="size-4 shrink-0 text-gray-400" />
                  <span>
                    <span className="font-medium">Capital:</span>{" "}
                    {formatCapital(country.capital)}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <GlobeAltIcon className="size-4 shrink-0 text-gray-400" />
                  <span>
                    <span className="font-medium">Region:</span>{" "}
                    {country.region}
                    {country.subregion && ` (${country.subregion})`}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <UserGroupIcon className="size-4 shrink-0 text-gray-400" />
                  <span>
                    <span className="font-medium">Population:</span>{" "}
                    {formatPopulation(country.population)}
                  </span>
                </p>
                {country.currencies && (
                  <p className="flex items-center gap-2">
                    <CurrencyDollarIcon className="size-4 shrink-0 text-gray-400" />
                    <span className="capitalize">
                      <span className="font-medium">Currency:</span>{" "}
                      {Object.values(country.currencies)
                        .map((c) => `${c.name} (${c.symbol})`)
                        .join(", ")}
                    </span>
                  </p>
                )}
                {country.languages && (
                  <p className="flex items-center gap-2">
                    <LanguageIcon className="size-4 shrink-0 text-gray-400" />
                    <span>
                      <span className="font-medium">Languages:</span>{" "}
                      {Object.values(country.languages).join(", ")}
                    </span>
                  </p>
                )}
              </div>

              {/* Borders */}
              {country.borders && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                    Borders
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {country.borders.map((border) => (
                      <Link
                        key={border}
                        to={`/country/${border}`}
                        className="px-2 py-1 text-xs bg-gray-100 hover:bg-blue-100 rounded border border-gray-300 text-gray-600 transition"
                      >
                        {border}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Coat of Arms */}
              {country.coatOfArms?.svg && (
                <div className="mt-10 flex flex-col items-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                    Coat of Arms
                  </p>
                  <img
                    src={country.coatOfArms.svg}
                    alt="Coat of Arms"
                    className="h-30 object-contain"
                  />
                </div>
              )}
            </div>

            {/* ── Right Side (Scrollable) ── */}
            <div className="md:w-2/3 p-8 space-y-10">
              {/* Country Summary */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Country Summary
                </h2>
                {summaryLoading && (
                  <Spinner label="Generating history brief…" />
                )}
                {summaryError && (
                  <p className="text-red-500 text-sm">
                    Could not load summary: {summaryError}
                  </p>
                )}
                {summary && (
                  <SummaryTypeWriter text={summary}/>
                )}
              </section>

              {/* Economic LineChart */}
              {(gdpLoading || inflationLoading) && (
                <Spinner label="Loading economic data..." />
              )}
              {(gdpData || inflation) && (
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Economic Metrics (Annual %)
                  </h2>
                  <PercentageLineChart
                    series={[
                      {
                        label: "GDP Growth",
                        data: gdpData,
                        color: "#1855ce",
                        dataKey: "gdp",
                      },
                      {
                        label: "Inflation",
                        data: inflation,
                        color: "#ef4444",
                        dataKey: "inflation",
                      },
                    ]}
                  />
                </section>
              )}

              {/* Employment Details */}
              {unemploymentLoading && (
                <Spinner label="Loading employment details" />
              )}
              {unemploymentError && (
                <p className="text-red-500 text-sm">
                  Could not load employment details: {unemploymentError}
                </p>
              )}
              {unemployment && (
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Employment
                  </h2>

                  <PercentageLineChart
                    series={[
                      {
                        label: "Unemployment Rate",
                        data: unemployment,
                        color: "#ef4444",
                        dataKey: "unemployment",
                      },
                    ]}
                  />
                </section>
              )}

              {/* Details — unique fields not shown on the left */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Other Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  <DetailRow
                    label="Continent"
                    value={country.continents?.join(", ")}
                  />
                  <DetailRow
                    label="Area"
                    value={
                      country.area
                        ? `${country.area.toLocaleString()} km²`
                        : null
                    }
                  />
                  <DetailRow
                    label="Landlocked"
                    value={
                      country.landlocked !== undefined
                        ? country.landlocked
                          ? "Yes"
                          : "No"
                        : null
                    }
                  />
                  <DetailRow
                    label="Driving Side"
                    value={
                      country.car?.side
                        ? country.car.side.charAt(0).toUpperCase() +
                          country.car.side.slice(1) +
                          " side"
                        : null
                    }
                  />
                  <DetailRow
                    label="Timezones"
                    value={country.timezones?.join(", ")}
                  />
                  <DetailRow
                    label="Start of Week"
                    value={
                      country.startOfWeek
                        ? country.startOfWeek.charAt(0).toUpperCase() +
                          country.startOfWeek.slice(1)
                        : null
                    }
                  />
                  <DetailRow
                    label="Calling Code"
                    value={
                      country.idd?.root
                        ? `${country.idd.root}${country.idd.suffixes?.[0] ?? ""}`
                        : null
                    }
                  />
                  <DetailRow
                    label="Top-Level Domain"
                    value={country.tld?.join(", ")}
                  />
                  <DetailRow
                    label="Country Codes"
                    value={[country.cca2, country.cca3, country.cioc]
                      .filter(Boolean)
                      .join(" / ")}
                  />
                  <DetailRow label="FIFA Code" value={country.fifa} />
                  <DetailRow
                    label="Gini Coefficient"
                    value={
                      country.gini
                        ? `${Object.values(country.gini)[0]} (${Object.keys(country.gini)[0]})`
                        : null
                    }
                  />
                  <DetailRow label="Demonym" value={country.demonyms?.eng?.m} />
                  <DetailRow
                    label="Postal Code Format"
                    value={country.postalCode?.format}
                  />
                  <DetailRow
                    label="UN Member"
                    value={
                      country.unMember !== undefined
                        ? country.unMember
                          ? "Yes"
                          : "No"
                        : null
                    }
                  />
                  <DetailRow
                    label="Independent"
                    value={
                      country.independent !== undefined
                        ? country.independent
                          ? "Yes"
                          : "No"
                        : null
                    }
                  />
                  <DetailRow
                    label="Car Sign"
                    value={country.car?.signs?.join(", ")}
                  />
                </div>

                {/* Map links */}
                {country.maps && (
                  <div className="mt-4 flex gap-4">
                    {country.maps.googleMaps && (
                      <a
                        href={country.maps.googleMaps}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                      >
                        <MapIcon className="size-4" /> Google Maps
                      </a>
                    )}
                    {country.maps.openStreetMaps && (
                      <a
                        href={country.maps.openStreetMaps}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                      >
                        <GlobeAmericasIcon className="size-4" /> OpenStreetMap
                      </a>
                    )}
                  </div>
                )}
              </section>

              {/* Latest News */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                  <NewspaperIcon className="size-5" /> Latest News
                </h2>
                {newsLoading && <Spinner label="Fetching latest news…" />}
                {newsError && (
                  <p className="text-red-500 text-sm">
                    Could not load news: {newsError}
                  </p>
                )}
                {!newsLoading && articles.length === 0 && !newsError && (
                  <p className="text-gray-400 text-sm">No recent news found.</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {articles.map((article) => (
                    <a
                      key={article.id}
                      href={article.webUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition"
                    >
                      {article.fields?.thumbnail && (
                        <img
                          src={article.fields.thumbnail}
                          alt={article.webTitle}
                          className="w-full h-36 object-cover group-hover:opacity-90 transition"
                        />
                      )}
                      <div className="p-3 flex flex-col gap-1 flex-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          {article.sectionName}
                        </p>
                        <p className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-blue-600 transition line-clamp-2">
                          {article.fields?.headline ?? article.webTitle}
                        </p>
                        {article.fields?.trailText && (
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                            {article.fields.trailText}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-auto pt-2">
                          {new Date(
                            article.webPublicationDate,
                          ).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
