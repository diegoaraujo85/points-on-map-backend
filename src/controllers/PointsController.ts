import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// import AppError from '@shared/errors/AppError';
// Read json file
// import points from '../poi.json';

const pathToJsonFile = path.resolve(__dirname, '..', process.env.JSON_PATH);

function getPoints(): any {
  let data: any;
  try {
    const jsonString = fs.readFileSync(pathToJsonFile);
    data = JSON.parse(jsonString.toString());
  } catch (err) {
    console.log(err);
  }

  return data;
}

function writePointToJsonFile(jsonString: string) {
  fs.writeFile(pathToJsonFile, JSON.stringify(jsonString), err => {
    // Checking for errors
    if (err) throw err;

    console.log('Done writing'); // Success
  });
}

export default class PointsController {
  async index(request: Request, response: Response): Promise<Response> {
    const points = getPoints();
    return response.json(points);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const points = getPoints();
    const point = points.filter(p => p.name === name);
    return response.json(point);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const points = getPoints();
    const newPoints = points.filter(p => p.name !== name);

    fs.writeFile(pathToJsonFile, JSON.stringify(newPoints), err => {
      // Checking for errors
      if (err) throw err;

      console.log('Done writing'); // Success
    });

    return response.json(newPoints);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, latitude, longitude } = request.body;
    const points = getPoints();

    const point = {
      name,
      latitude,
      longitude,
    };

    points.push(point);

    writePointToJsonFile(points);

    return response.json(points);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, latitude, longitude } = request.body;
    const points = getPoints();

    const nameOfPointToUpdate = request.query.name;
    const filteredPoints = points.filter(p => p.name !== nameOfPointToUpdate);

    const pointToUpdate = {
      name,
      latitude,
      longitude,
    };

    filteredPoints.push(pointToUpdate);

    writePointToJsonFile(filteredPoints);

    return response.json(filteredPoints);
  }
}
