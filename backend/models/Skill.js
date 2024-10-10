import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,      
    trim: true,          
  },
  description: {
    type: String,
    required: true,      
    trim: true,
  },
  category: {
    type: String,        
    enum: ['Technical', 'Creative', 'Business', 'Personal Development', 'Other'], 
    default: 'Other',
  },
  level: {
    type: String,        
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  image: {
    data: Buffer,        // Storing file in MongoDB as binary data
    contentType: String,
  },
  resources:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
  },
  createdAt: {
    type: Date,
    default: Date.now,    
  },
  updatedAt: {
    type: Date,           
    default: Date.now,
  }
});


SkillSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Skill = mongoose.model('Skill', SkillSchema);

export default Skill;
