export default class ForecastUnits {
  constructor(
    public time: Date,
    public temperature_2m: string,
    public surface_pressure: string,
    public relative_humidity: string,
    public rain: string,
    public cloud_cover: string,
  ) {}
}