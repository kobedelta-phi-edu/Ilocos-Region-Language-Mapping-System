import geopandas as gpd
import folium

# Load shapefile
shapefile_path = 'path/to/shapefile.shp'
gdf = gpd.read_file(shapefile_path)

# Visualize shapefile
m = folium.Map(location=[gdf['geometry'].centroid.y.mean(), 
                          gdf['geometry'].centroid.x.mean()], 
               zoom_start=10)
folium.GeoJson(gdf).add_to(m)
m
