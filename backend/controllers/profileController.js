import Profile from '../models/Profile.js';

export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();

    res.status(200).json({
      status: 'success',
      data: profile || null
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message || 'Failed to fetch profile.'
    });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {}, 
      req.body, 
      {
        new: true, 
        runValidators: true,
        upsert: true, 
        setDefaultsOnInsert: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: profile
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message || 'Failed to update profile.'
    });
  }
};