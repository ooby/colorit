import sys
import numpy as np
import os
import skimage.color as color
import matplotlib.pyplot as plt
import scipy.ndimage.interpolation as sni
import caffe

if __name__ == '__main__':
	caffe.set_mode_cpu()
	arg_prototxt = '/opt/col_distr/models/colorization_deploy_v2.prototxt'
	arg_caffemodel = '/opt/col_distr/models/colorization_release_v2.caffemodel'
	net = caffe.Net(arg_prototxt, arg_caffemodel, caffe.TEST)
	(H_in,W_in) = net.blobs['data_l'].data.shape[2:]
	(H_out,W_out) = net.blobs['class8_ab'].data.shape[2:]
	pts_in_hull = np.load('/opt/col_distr/resources/pts_in_hull.npy')
	net.params['class8_ab'][0].data[:,:,0,0] = pts_in_hull.transpose((1,0))
	img_rgb = caffe.io.load_image(sys.argv[1])
	img_lab = color.rgb2lab(img_rgb)
	img_l = img_lab[:,:,0]
	(H_orig,W_orig) = img_rgb.shape[:2]
	img_lab_bw = img_lab.copy()
	img_lab_bw[:,:,1:] = 0
	img_rgb_bw = color.lab2rgb(img_lab_bw)
	img_rs = caffe.io.resize_image(img_rgb,(H_in,W_in))
	img_lab_rs = color.rgb2lab(img_rs)
	img_l_rs = img_lab_rs[:,:,0]
	net.blobs['data_l'].data[0,0,:,:] = img_l_rs-50
	net.forward()
	ab_dec = net.blobs['class8_ab'].data[0,:,:,:].transpose((1,2,0))
	ab_dec_us = sni.zoom(ab_dec,(1.*H_orig/H_out,1.*W_orig/W_out,1))
	img_lab_out = np.concatenate((img_l[:,:,np.newaxis],ab_dec_us),axis=2)
	img_rgb_out = (255*np.clip(color.lab2rgb(img_lab_out),0,1)).astype('uint8')
	plt.imsave(sys.argv[2], img_rgb_out)